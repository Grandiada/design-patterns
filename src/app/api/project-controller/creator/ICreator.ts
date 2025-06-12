import { TaskComponent } from "../types";

export abstract class Creator {
  public abstract createObject(
    name: string,
    description: string
  ): TaskComponent;
}
