import { generateId } from "@/lib";
import { Status } from "./Status";
import { Publisher } from "./Publisher";
import { IObserver } from "./IObserver";

export abstract class TaskComponent extends Publisher {
  public id: string;

  constructor(
    public name: string,
    public description: string,
    public status: Status = Status.PENDING,
    public isProject: boolean = false
  ) {
    super();
    this.id = generateId();
  }

  abstract add(component: TaskComponent): void;

  abstract remove(component: TaskComponent): void;

  abstract list(): TaskComponent[];

  changeStatus(status: Status): void {
    this.notifyObservers(
      this.id,
      `${this.name}: changed status from ${this.status} to ${status}`
    );
    this.status = status;
  }

  findComponentById(
    id: string,
    parentComponent?: TaskComponent
  ):
    | {
        component: TaskComponent | undefined;
        parentComponent: TaskComponent | undefined;
      }
    | undefined {
    return this.id === id
      ? {
          component: this,
          parentComponent: parentComponent,
        }
      : undefined;
  }

  attachObserver(observerId: string, observer: IObserver): void {
    this.observers.set(observerId, observer);
  }

  deattachObserver(observerId: string): void {
    this.observers.delete(observerId);
  }

  notifyObservers(id: string, message: string): void {
    this.observers.forEach((observer) => {
      observer.update(id, message);
    });
  }
}
