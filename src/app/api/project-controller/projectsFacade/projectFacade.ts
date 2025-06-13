import { Project, TaskComponent } from "../taskComponent";

export class ProjectFacade {
  constructor(private readonly projects: Project[]) {}

  getProjects() {
    return this.projects;
  }

  getComponentsById(id: string) {
    const target = this.projects.reduce((acc, project) => {
      const component = project.findComponentById(id);
      if (component) {
        acc = component.component;
      }
      return acc;
    }, undefined as TaskComponent | undefined);

    return target;
  }

  getComponentWithParentById(id: string) {
    const target = this.projects.reduce(
      (acc, project) => {
        const toMoveComponent = project.findComponentById(id);
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

    return target;
  }

  serialize() {
    return this.projects.map((p) => p.toView());
  }
}
