import {
  moveTask,
  Project,
  subscribe,
  TaskComponent,
} from "@/app/api/project-controller";
import React from "react";
import * as Styled from "./Task.styled";
import { StatusSelector } from "../StatusSelector";
import { useClientId } from "@/lib";

export const Projects = (props: { task: TaskComponent }) => {
  const task = props.task;
  const id = useClientId();

  if (task.isProject) {
    return (
      <Styled.Project
        onDragOver={(ev) => {
          ev.preventDefault();
        }}
        onDrop={(ev) => {
          ev.preventDefault();
          ev.stopPropagation();
          const taskId = ev.dataTransfer.getData("text/plain");
          moveTask(taskId, task.id);
        }}
      >
        <Styled.TaskHeader>
          <h3>
            {task.id} | {task.name}
          </h3>
          <StatusSelector
            componentId={props.task.id}
            status={props.task.status}
          />
        </Styled.TaskHeader>
        <p>{task.description}</p>
        <Styled.TaskList>
          {(task as Project).components.map((component) => (
            <Styled.Project key={component.id}>
              <Projects task={component} />
            </Styled.Project>
          ))}
        </Styled.TaskList>
        <Styled.Button
          style={{ marginLeft: "auto" }}
          onClick={() => {
            if (id) {
              subscribe(id, task.id);
            }
          }}
        >
          Subscribe
        </Styled.Button>
      </Styled.Project>
    );
  }

  return (
    <Styled.Task
      draggable={true}
      onDragStart={(ev) => {
        ev.dataTransfer.clearData();
        ev.dataTransfer.setData("text/plain", task.id);
      }}
    >
      <Styled.TaskHeader>
        <h3>
          {task.id} | {task.name}
        </h3>
        <StatusSelector componentId={task.id} status={task.status} />
      </Styled.TaskHeader>
      <p>{task.description}</p>
      <Styled.Button
        style={{ marginRight: "auto" }}
        onClick={() => {
          if (id) {
            subscribe(id, task.id);
          }
        }}
      >
        Subscribe
      </Styled.Button>
    </Styled.Task>
  );
};
