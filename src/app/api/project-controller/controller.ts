"use server";

import { CreateProjectHandler } from "./creationHandler/CreateProjectHandler";
import { CreateTaskComponentRequest } from "./creationHandler/CreateTaskComponentRequest";
import { CreateTaskHandler } from "./creationHandler/CreateTaskHandler";
import { PlaceTaskHandler } from "./creationHandler/PlaceTaskHandler";
import { Project, Status, Task, TaskComponent } from "./types";

const projects: Project[] = [
  new Project(
    "E-commerce Platform",
    "Main e-commerce website development project",
    [
      new Project(
        "Frontend Development",
        "User interface and experience implementation",
        [
          new Task(
            "Shopping Cart",
            "Implement shopping cart functionality with real-time updates"
          ),
          new Task(
            "Product Catalog",
            "Create responsive product listing with filters and search"
          ),
          new Task(
            "Checkout Flow",
            "Build multi-step checkout process with payment integration"
          ),
        ]
      ),
      new Project(
        "Backend Development",
        "Server-side implementation and APIs",
        [
          new Task(
            "User Authentication",
            "Implement secure login/signup with JWT tokens"
          ),
          new Task(
            "Order Management",
            "Create APIs for order processing and tracking"
          ),
          new Task(
            "Database Design",
            "Design and implement database schema for products and users"
          ),
        ]
      ),
    ]
  ),
  new Project("Mobile App", "Native mobile application development", [
    new Task(
      "UI Components",
      "Develop reusable UI components following design system"
    ),
    new Task(
      "Push Notifications",
      "Implement push notification system for order updates"
    ),
    new Task(
      "Offline Mode",
      "Add offline capability for basic app functionality"
    ),
  ]),
  new Project("DevOps", "Infrastructure and deployment", [
    new Task(
      "CI/CD Pipeline",
      "Set up automated testing and deployment workflow"
    ),
    new Task("Monitoring", "Implement logging and monitoring with alerts"),
    new Task(
      "Security Audit",
      "Perform security assessment and implement fixes"
    ),
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
    const observer = {
      update: async (componentId: string, message: string) => {
        await fetch(
          `${process.env.NEXT_PUBLIC_SITE_URL}/api/project-controller?userId=${userId}`,
          {
            method: "POST",
            body: JSON.stringify({
              componentId,
              message,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );
      },
    };
    target.attachObserver(userId, observer);
  }
};

export const addTask = async (request: CreateTaskComponentRequest) => {
  const handler = new CreateTaskHandler();
  handler
    .setNext(new CreateProjectHandler())
    .setNext(new PlaceTaskHandler(projects));

  const result = handler.handle(request);

  return result;
};
