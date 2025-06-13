import { Project } from "@/app/api/project-controller/taskComponent";
import { TaskView } from "@/app/api/project-controller/viewModels";
import { Collapse } from "antd";
import React from "react";

export const Task: React.FC<{ task: TaskView }> = ({ task }) => {
  if (task.isProject)
    return (task as Project).components.map((component: TaskView) => (
      <Task key={component.id} task={component} />
    ));

  return (
    <Collapse
      size="small"
      items={[
        {
          key: task.id,
          label: `Task: ${task.id} | ${task.name}`,
          children: <p>{task.description}</p>,
        },
      ]}
    />
  );
};
