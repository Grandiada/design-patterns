import { Figure } from "../entities";
import { IObserver } from "../observer/Observer";

export abstract class Publisher {
  protected observers: Map<string, IObserver> = new Map();
  protected abstract attachObserver(
    observerId: string,
    observer: IObserver
  ): void;
  protected abstract deattachObserver(observerId: string): void;
  protected abstract notifyObservers(id: string, figure: Figure | null): void;
}
