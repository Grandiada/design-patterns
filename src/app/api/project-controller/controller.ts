"use server";

import { CommandManager } from "./commands/CommandManager";
import { MoveCommand } from "./commands/MoveCommand";
import { CreateProjectHandler } from "./creationHandler/CreateProjectHandler";
import { CreateTaskComponentRequest } from "./viewModels/CreateTaskComponentRequest";
import { CreateTaskHandler } from "./creationHandler/CreateTaskHandler";
import { PlaceTaskHandler } from "./creationHandler/PlaceTaskHandler";
import { ProjectFacade } from "./projectsFacade";
import { Project, Status, Task } from "./taskComponent";

const projectsFacade = new ProjectFacade([
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
]);

const commandManager = CommandManager.getInstance();

export const getProjects = async () => {
  return projectsFacade.serialize();
};

export const changeStatus = async (taskComponentId: string, status: Status) => {
  const target = projectsFacade.getComponentsById(taskComponentId);

  if (target) {
    target.changeStatus(status);
  }
};

export const moveTask = async (
  componentToMoveId: string,
  targetComponentId: string
) => {
  const command = new MoveCommand(
    componentToMoveId,
    targetComponentId,
    projectsFacade
  );

  commandManager.executeCommand(command);
};

export const subscribe = async (userId: string, taskId: string) => {
  const target = projectsFacade.getComponentsById(taskId);

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
    .setNext(new PlaceTaskHandler(projectsFacade));

  const result = handler.handle(request);

  return result;
};

export const undoCommand = async () => {
  if (commandManager.isUndoAvailable()) {
    commandManager.undo();
  } else {
    return {
      errorMessage: "No command to undo",
    };
  }
};
