import { TaskCreator } from "../creator/TaskCreator";
import { TaskComponent } from "../taskComponent";
import { AbstractHandler } from "./AbstractHandler";
import { CreateTaskComponentRequest } from "../viewModels/CreateTaskComponentRequest";

export class CreateTaskHandler extends AbstractHandler {
  public handle(
    request: CreateTaskComponentRequest,
    component?: TaskComponent
  ): TaskComponent[] | null {
    let object: TaskComponent | undefined = undefined;
    if (request.type === "task") {
      object = new TaskCreator().createObject(
        request.name,
        request.description
      );
    }

    return super.handle(request, object || component);
  }
}
