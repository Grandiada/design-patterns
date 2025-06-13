import { AddCommand } from "../commands/AddComand";
import { CommandManager } from "../commands/CommandManager";
import { ProjectFacade } from "../projectsFacade";
import { TaskComponent } from "../taskComponent";
import { AbstractHandler } from "./AbstractHandler";
import { CreateTaskComponentRequest } from "../viewModels/CreateTaskComponentRequest";

export class PlaceTaskHandler extends AbstractHandler {
  private readonly commandManager = CommandManager.getInstance();

  /**
   *
   */
  constructor(private readonly projectsFacade: ProjectFacade) {
    super();
  }

  public handle(
    request: CreateTaskComponentRequest,
    component?: TaskComponent
  ): TaskComponent[] | null {
    if (request.parentId && component) {
      const command = new AddCommand(
        component,
        request.parentId,
        this.projectsFacade
      );

      this.commandManager.executeCommand(command);
    }

    return super.handle(request, component);
  }
}
