import { TaskComponent } from "../taskComponent/TaskComponent";

export interface IObserver {
  update(id: TaskComponent["id"], message: string): void;
}
