import { Project, Task } from "../taskComponent";

export type TaskView =
  | Pick<Task, "id" | "name" | "description" | "status" | "isProject">
  | (Pick<Project, "id" | "name" | "description" | "status" | "isProject"> & {
      components: TaskView[];
    });
