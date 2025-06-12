import { Project, TaskComponent } from "../types";
import { ICommand } from "./ICommand";

export class MoveCommand implements ICommand {
  private prevParrentId: string | undefined = undefined;

  constructor(
    private readonly componentToMoveId: string,
    private readonly targetComponentId: string,
    private readonly projects: Project[]
  ) {}

  private move(componentToMoveId: string, targetComponentId: string): void {
    const componentToMove = this.projects.reduce(
      (acc, project) => {
        const toMoveComponent = project.findComponentById(componentToMoveId);
        if (toMoveComponent) {
          acc = {
            component: toMoveComponent.component,
            parentComponent: toMoveComponent.parentComponent,
          };
        }
        return acc;
      },
      undefined as
        | {
            component: TaskComponent | undefined;
            parentComponent: TaskComponent | undefined;
          }
        | undefined
    );

    this.prevParrentId = componentToMove?.parentComponent?.id;

    const target = this.projects.reduce((acc, project) => {
      const component = project.findComponentById(targetComponentId);
      if (component) {
        acc = component.component;
      }
      return acc;
    }, undefined as TaskComponent | undefined);

    if (
      componentToMove &&
      componentToMove.component &&
      componentToMove.parentComponent &&
      target
    ) {
      componentToMove.parentComponent?.remove(componentToMove.component);
      target.add(componentToMove.component);
    }
  }

  execute(): void {
    this.move(this.componentToMoveId, this.targetComponentId);
  }

  undo(): void {
    if (this.prevParrentId) {
      this.move(this.componentToMoveId, this.prevParrentId);
    }
  }
}
