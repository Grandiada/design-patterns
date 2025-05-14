import { RectangleCreator } from "../creators/RectangleCreator";
import { Rectangle } from "../entities";
import { RectangleService } from "../services";
import { Manager } from "./Manager";

export class RectangleManager extends Manager<Rectangle> {
  public factory = new RectangleCreator();
  public path = "src/input/rectangles.txt";
  public coordinatesLength = 8;

  protected analyze(object: Rectangle): string {
    const service = new RectangleService(object);

    return (
      `Rectangle ID: ${object.id}\n` +
      `Perimeter: ${service.perimeter()}\n` +
      `Area: ${service.area()}\n` +
      `Is Rectangle: ${service.isRectangle()}\n` +
      `Is Square: ${service.isSquare()}\n` +
      `Is Rhombus: ${service.isRhombus()}\n` +
      `Is Trapezoid: ${service.isTrapezoid()}\n` +
      `Is Convex: ${service.isConvex()}\n`
    );
  }
}
