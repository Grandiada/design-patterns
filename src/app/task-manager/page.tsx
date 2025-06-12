"use client";

import { startTransition, useEffect, useState } from "react";
import { getProjects, Project } from "@/app/api/project-controller";
import { Projects } from "./_components/Task";
import * as Styled from "./page.styled";
import { useClientId } from "@/lib";
import { ToastContainer, toast } from "react-toastify";
import { Empty, Flex, Layout, Spin, Splitter, Typography } from "antd";
import "@ant-design/v5-patch-for-react-19";
import Link from "next/link";

export default function TaskManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const id = useClientId();

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
        setIsConnected(true);
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
      <Styled.Header>
        <h1>Task Manager | {id}</h1>
      </Styled.Header>
      <Layout>
        <Splitter
          style={{
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            overflowY: "auto",
          }}
        >
          <Splitter.Panel defaultSize="10%" min="10%" max="70%">
            <Flex justify="center" style={{ height: "100%", padding: "10px" }}>
              <Typography.Text>
                <Link href="/task-manager">Projects List</Link>
              </Typography.Text>
            </Flex>
          </Splitter.Panel>
          <Splitter.Panel>
            {!isConnected && (
              <Styled.LoaderWrapper>
                <Spin size="large" />
              </Styled.LoaderWrapper>
            )}
            {!projects.length && isConnected && <Empty />}
            {projects.length > 0 && (
              <Styled.Content>
                {projects.map((project) => (
                  <Projects key={project.id} task={project} />
                ))}
              </Styled.Content>
            )}
          </Splitter.Panel>
        </Splitter>
      </Layout>
      <ToastContainer />
    </Styled.Root>
  );
}
