import { AddCommand } from "../commands/AddComand";
import { CommandManager } from "../commands/CommandManager";
import { Project, TaskComponent } from "../types";
import { AbstractHandler } from "./AbstractHandler";
import { CreateTaskComponentRequest } from "./CreateTaskComponentRequest";

export class PlaceTaskHandler extends AbstractHandler {
  private readonly commandManager = CommandManager.getInstance();

  /**
   *
   */
  constructor(private readonly projects?: Project[]) {
    super();
  }

  public handle(
    request: CreateTaskComponentRequest,
    component?: TaskComponent
  ): TaskComponent[] | null {
    if (request.parentId && component && this.projects) {
      const command = new AddCommand(
        component,
        request.parentId,
        this.projects
      );
      
      this.commandManager.executeCommand(command);
    }

    return super.handle(request, component);
  }
}
