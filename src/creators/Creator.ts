import { Figure } from "../entities/Figure";

export abstract class Creator {
  public abstract createObject(id: string, coordinates: number[]): Figure;
}
