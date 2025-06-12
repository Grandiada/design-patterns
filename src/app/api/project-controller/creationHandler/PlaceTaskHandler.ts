import { Project, TaskComponent } from "../types";
import { AbstractHandler } from "./AbstractHandler";
import { CreateTaskComponentRequest } from "./CreateTaskComponentRequest";

export class PlaceTaskHandler extends AbstractHandler {
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
    if (request.parentId && component) {
      const target = this.projects?.reduce((acc, project) => {
        if (!request.parentId) {
          return acc;
        }

        const component = project.findComponentById(request.parentId);
        if (component) {
          acc = component.component;
        }
        return acc;
      }, undefined as TaskComponent | undefined);

      if (target) {
        target.add(component);
      }
    }

    return super.handle(request, component);
  }
}
