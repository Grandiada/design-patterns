import { ProjectCreator } from "../creator/ProjectCreator";
import { TaskComponent } from "../taskComponent";
import { AbstractHandler } from "./AbstractHandler";
import { CreateTaskComponentRequest } from "../viewModels/CreateTaskComponentRequest";

export class CreateProjectHandler extends AbstractHandler {
  public handle(
    request: CreateTaskComponentRequest,
    component?: TaskComponent
  ): TaskComponent[] | null {
    let object: TaskComponent | undefined = undefined;

    if (request.type === "project") {
      object = new ProjectCreator().createObject(
        request.name,
        request.description
      );
    }

    return super.handle(request, object || component);
  }
}
