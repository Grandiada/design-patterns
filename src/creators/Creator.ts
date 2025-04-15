import { Tetrahedron, Rectangle } from "../entities";

export abstract class Creator {
  public abstract createObject(
    line: string
  ): Rectangle | Tetrahedron | undefined;
}
