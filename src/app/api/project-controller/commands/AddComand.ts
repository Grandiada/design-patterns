import { Project, TaskComponent } from "../types";
import { ICommand } from "./ICommand";

export class AddCommand implements ICommand {
  constructor(
    private readonly taskComponent: TaskComponent,
    private readonly parentId: string,
    private readonly projects: Project[]
  ) {}

  execute(): void {
    const target = this.projects?.reduce((acc, project) => {
      if (!this.parentId) {
        return acc;
      }

      const component = project.findComponentById(this.parentId);
      if (component) {
        acc = component.component;
      }
      return acc;
    }, undefined as TaskComponent | undefined);

    if (target) {
      target.add(this.taskComponent);
    }
  }

  undo(): void {
    const target = this.projects?.reduce((acc, project) => {
        if (!this.parentId) {
          return acc;
        }
  
        const component = project.findComponentById(this.parentId);
        if (component) {
          acc = component.component;
        }
        return acc;
      }, undefined as TaskComponent | undefined);

      
    if (target) {
      target.remove(this.taskComponent);
    }
  }
}
