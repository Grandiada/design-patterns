import { Figure } from "./Figure";
import { Point2D } from "./Point2D";

export class Rectangle extends Figure<Point2D> {
  constructor(id: string, p1: Point2D, p2: Point2D, p3: Point2D, p4: Point2D) {
    super(id, p1, p2, p3, p4);
  }
}
