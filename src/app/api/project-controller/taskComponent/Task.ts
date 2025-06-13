/* eslint-disable @typescript-eslint/no-unused-vars */
import { TaskComponent } from "./TaskComponent";

export class Task extends TaskComponent {
  add(component: TaskComponent): void {
    throw new Error("Cannot add to a task");
  }

  remove(component: TaskComponent): void {
    throw new Error("Cannot remove from a task");
  }

  list(): TaskComponent[] {
    return [this];
  }
}
