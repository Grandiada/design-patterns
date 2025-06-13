import { Task } from "../taskComponent";
import { Creator } from "./ICreator";

export class TaskCreator implements Creator {
  public createObject(name: string, description: string): Task {
    return new Task(name, description);
  }
}
