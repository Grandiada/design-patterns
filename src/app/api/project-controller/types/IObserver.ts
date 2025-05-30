import { TaskComponent } from "./TaskComponent";

export interface IObserver {
  update(id: TaskComponent["id"], message: string): void;
}
