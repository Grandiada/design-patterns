import { TaskComponent } from "../taskComponent";

export abstract class Creator {
  public abstract createObject(
    name: string,
    description: string
  ): TaskComponent;
}
