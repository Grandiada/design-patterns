import { TaskView } from "../viewModels";
import { TaskComponent } from "./TaskComponent";

export class Project extends TaskComponent {
  public components: TaskComponent[] = [];

  constructor(name: string, description: string, tasks?: TaskComponent[]) {
    super(name, description);
    this.isProject = true;
    this.components = tasks || [];
  }

  add(component: TaskComponent): void {
    this.components.push(component);
    this.notifyObservers(this.id, `Added ${component.name} in ${this.name}`);
  }

  remove(component: TaskComponent): void {
    const newComponents = this.components.filter((c) => c.id !== component.id);
    this.components = newComponents;
    this.notifyObservers(
      this.id,
      `Removed ${component.name} from ${this.name}`
    );
  }

  list(): TaskComponent[] {
    const components = this.components.map((c) => c.list());
    return components.flat();
  }

  findComponentById(id: string):
    | {
        component: TaskComponent | undefined;
        parentComponent: TaskComponent | undefined;
      }
    | undefined {
    if (this.id === id) {
      return {
        component: this,
        parentComponent: undefined,
      };
    }

    for (const component of this.components) {
      const result = component.findComponentById(id, this);

      if (result) {
        return result;
      }
    }

    return undefined;
  }

  toView(): TaskView {
    return {
      ...super.toView(),
      components: this.components.map((c) => c.toView()),
    };
  }
}
