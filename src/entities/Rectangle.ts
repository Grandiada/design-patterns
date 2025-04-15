import { Point } from "./Point";

export class Rectangle {
  constructor(
    public readonly id: string,
    public readonly p1: Point,
    public readonly p2: Point,
    public readonly p3: Point,
    public readonly p4: Point
  ) {}
}
