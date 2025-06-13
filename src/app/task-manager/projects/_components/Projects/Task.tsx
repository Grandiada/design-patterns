import { moveTask, subscribe } from "@/app/api/project-controller";
import React, { useState } from "react";
import * as Styled from "./Task.styled";
import { StatusSelector } from "../StatusSelector";
import { useClientId } from "@/lib";
import { Button, Collapse, Flex, List, Typography } from "antd";
import { AddTask } from "../AddTask";
import { TaskView } from "@/app/api/project-controller/viewModels";
import { Project } from "@/app/api/project-controller/taskComponent";

export const Task: React.FC<{ task: TaskView }> = (props) => {
  const task = props.task;
  const id = useClientId();
  const [isHighlighted, setIsHighlited] = useState(false);

  if (task.isProject) {
    return (
      <Styled.Project
        variant="outlined"
        onDragEnter={(ev) => {
          ev.preventDefault();
          ev.stopPropagation();
          setIsHighlited(true);
        }}
        onDragLeave={(ev) => {
          ev.preventDefault();
          ev.stopPropagation();
          setIsHighlited(false);
        }}
        onDragOver={(ev) => {
          ev.preventDefault();
          ev.stopPropagation();
          setIsHighlited(true);
        }}
        $isHighlited={isHighlighted}
        onDrop={(ev) => {
          ev.preventDefault();
          ev.stopPropagation();
          const taskId = ev.dataTransfer.getData("text/plain");
          moveTask(taskId, task.id);
          setIsHighlited(false);
        }}
        title={
          <Flex vertical>
            <Typography.Text>
              {task.id} Project: {task.name}
            </Typography.Text>
            <Typography.Text>{task.description}</Typography.Text>
          </Flex>
        }
        extra={
          <Flex gap={10} style={{ padding: "5px" }}>
            <StatusSelector
              componentId={props.task.id}
              status={props.task.status}
            />
            <Flex vertical gap={10}>
              <Button
                style={{ marginLeft: "auto" }}
                onClick={() => {
                  if (id) {
                    subscribe(id, task.id);
                  }
                }}
              >
                Subscribe
              </Button>

              <AddTask parentId={task.id} />
            </Flex>
          </Flex>
        }
      >
        {!!(task as Project).components.length && (
          <Collapse
            items={(task as Project).components
              .filter((component) => component.isProject)
              .map((component) => ({
                key: component.id,
                label: component.name,
                children: <Task key={component.id} task={component} />,
              }))}
          />
        )}

        {!!(task as Project).components.filter(
          (component) => !component.isProject
        ).length && (
          <Styled.TaskList
            size="small"
            locale={{
              emptyText: "No tasks",
            }}
          >
            {!!(task as Project).components.length &&
              (task as Project).components
                .filter((component) => !component.isProject)
                .map((component) => (
                  <Task key={component.id} task={component} />
                ))}
          </Styled.TaskList>
        )}
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
      <List.Item.Meta title={`Task: ${task.id} | ${task.name}`} />
      <div>
        <StatusSelector
          componentId={props.task.id}
          status={props.task.status}
        />
        <Button
          style={{ marginLeft: "auto" }}
          onClick={() => {
            if (id) {
              subscribe(id, task.id);
            }
          }}
        >
          Subscribe
        </Button>
      </div>
    </Styled.Task>
  );
};
