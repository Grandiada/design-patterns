import { Point2D } from "./Point2D";

export class Point3D extends Point2D {
  constructor(x: number, y: number, public readonly z: number = 0) {
    super(x, y);
  }
}
