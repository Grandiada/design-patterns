import { Tetrahedron, Rectangle } from "../entities";

export abstract class Creator {
  public abstract createObject(id: string, coordinates: number[]): Rectangle | Tetrahedron;
}
