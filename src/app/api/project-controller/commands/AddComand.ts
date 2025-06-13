import { ProjectFacade } from "../projectsFacade";
import { TaskComponent } from "../taskComponent";
import { ICommand } from "./ICommand";

export class AddCommand implements ICommand {
  constructor(
    private readonly taskComponent: TaskComponent,
    private readonly parentId: string,
    private readonly projectsFacade: ProjectFacade
  ) {}

  execute(): void {
    const target = this.projectsFacade.getComponentsById(this.parentId);

    if (target) {
      target.add(this.taskComponent);
    }
  }

  undo(): void {
    const target = this.projectsFacade.getComponentsById(this.parentId);

    if (target) {
      target.remove(this.taskComponent);
    }
  }
}
