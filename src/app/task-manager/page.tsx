"use client";

import { startTransition, useEffect, useState } from "react";
import { getProjects, Project } from "@/app/api/project-controller";
import { Projects } from "./_components/Task";
import * as Styled from "./page.styled";
import { useClientId } from "@/lib";
import { ToastContainer, toast } from "react-toastify";

export default function TaskManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const id = useClientId();

  useEffect(() => {
    // opening a connection to the server to begin receiving events from it
    const eventSource = new EventSource(`/api/project-controller?userId=${id}`);

    // attaching a handler to receive message events
    eventSource.onmessage = (event) => {
      const stockData = JSON.parse(event.data);
      console.log(stockData);
    };

    // terminating the connection on component unmount
    return () => eventSource.close();
  }, [id]);

  useEffect(() => {
    if (!id) return;
    const eventSource = new EventSource(`/api/project-controller?userId=${id}`);

    eventSource.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (Array.isArray(message)) {
        message.forEach((m) => {
          toast(m.message);
        });
      }

      startTransition(async () => {
        const updatedViews = await getProjects();
        setProjects(JSON.parse(updatedViews));
      });
    };

    eventSource.onerror = (err) => {
      console.error("SSE Error:", err);
      eventSource.close();
    };

    return () => eventSource.close();
  }, [id]);

  return (
    <Styled.Root>
      <h1>Task Manager | {id}</h1>
      {projects.map((project) => (
        <Projects key={project.id} task={project} />
      ))}
      <ToastContainer />
    </Styled.Root>
  );
}
