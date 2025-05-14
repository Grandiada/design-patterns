import { Point2D } from "./Point2D";
import { Point3D } from "./Point3D";

export abstract class Figure<P extends Point2D | Point3D = Point2D | Point3D> {
  constructor(
    public readonly id: string,
    public readonly p1: P,
    public readonly p2: P,
    public readonly p3: P,
    public readonly p4: P
  ) {}
}
