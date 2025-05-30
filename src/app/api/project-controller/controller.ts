"use server";

import { Project, Status, Task, TaskComponent } from "./types";
import { addMessage } from "@/lib/MessageService";

const projects: Project[] = [
  new Project("Project 1", "This is a project", [
    new Project("Project 1.1", "This is a project inside a project", [
      new Task(
        "Task 1.1.1",
        "This is a task inside a project inside a project"
      ),
      new Task(
        "Task 1.1.2",
        "This is another task inside a project inside a project"
      ),
    ]),
    new Project("Project 1.2", "This is another project inside a project", []),
  ]),
  new Project("Project 2", "This is another project"),
  new Project("Project 3", "This is a project with tasks", [
    new Task("Task 1", "This is a task"),
    new Task("Task 2", "This is another task"),
    new Task("Task 3", "This is a task with a description"),
  ]),
];

export const getProjects = async () => {
  return JSON.stringify(projects);
};

export const changeStatus = async (taskComponentId: string, status: Status) => {
  const target = projects.reduce((acc, project) => {
    const component = project.findComponentById(taskComponentId);
    if (component) {
      acc = component.component;
    }
    return acc;
  }, undefined as TaskComponent | undefined);

  if (target) {
    target.changeStatus(status);
  }
};

export const moveTask = async (
  componentToMoveId: string,
  targetComponentId: string
) => {
  const componentToMove = projects.reduce(
    (acc, project) => {
      const toMoveComponent = project.findComponentById(componentToMoveId);
      if (toMoveComponent) {
        acc = {
          component: toMoveComponent.component,
          parentComponent: toMoveComponent.parentComponent,
        };
      }
      return acc;
    },
    undefined as
      | {
          component: TaskComponent | undefined;
          parentComponent: TaskComponent | undefined;
        }
      | undefined
  );

  const target = projects.reduce((acc, project) => {
    const component = project.findComponentById(targetComponentId);
    if (component) {
      acc = component.component;
    }
    return acc;
  }, undefined as TaskComponent | undefined);

  if (
    componentToMove &&
    componentToMove.component &&
    componentToMove.parentComponent &&
    target
  ) {
    componentToMove.parentComponent?.remove(componentToMove.component);
    target.add(componentToMove.component);
  }
};

export const subscribe = async (userId: string, taskId: string) => {
  const target = projects.reduce((acc, project) => {
    const component = project.findComponentById(taskId);
    if (component) {
      acc = component.component;
    }
    return acc;
  }, undefined as TaskComponent | undefined);

  if (target) {
    target.attachObserver(userId, {
      update: (_id: string, message: string) => {
        addMessage(userId, _id, message);
      },
    });
  }
};
