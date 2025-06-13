import { ProjectFacade } from "../projectsFacade";
import { ICommand } from "./ICommand";

export class MoveCommand implements ICommand {
  private prevParrentId: string | undefined = undefined;

  constructor(
    private readonly componentToMoveId: string,
    private readonly targetComponentId: string,
    private readonly projectsFacade: ProjectFacade
  ) {}

  private move(componentToMoveId: string, targetComponentId: string): void {
    const componentToMove =
      this.projectsFacade.getComponentWithParentById(componentToMoveId);

    this.prevParrentId = componentToMove?.parentComponent?.id;
    
    const target = this.projectsFacade.getComponentsById(targetComponentId);

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
