import { Point2D } from "./Point2D";

export class Rectangle {
  constructor(
    public readonly id: string,
    public readonly p1: Point2D,
    public readonly p2: Point2D,
    public readonly p3: Point2D,
    public readonly p4: Point2D
  ) {}
}
