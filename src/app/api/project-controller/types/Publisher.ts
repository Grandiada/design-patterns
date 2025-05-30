import { IObserver } from "./IObserver";

export abstract class Publisher {
  protected observers: Map<string, IObserver> = new Map();
  abstract attachObserver(observerId: string, observer: IObserver): void;
  abstract deattachObserver(observerId: string): void;
  protected abstract notifyObservers(id: string, message: string): void;
}
