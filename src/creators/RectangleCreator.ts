import { Point } from "../entities/Point";
import { Rectangle } from "../entities/Rectangle";
import { InputParser } from "../parsers/InputParser";
import { Creator } from "./Creator";

export class RectangleCreator implements Creator {
  public createObject(line: string): Rectangle | undefined {
    const validator = new InputParser(8);
    const validationResult = validator.validateAndParse(line);

    if (!validationResult.isValid) {
      return;
    }

    const [x1, y1, x2, y2, x3, y3, x4, y4] = validationResult.coordinates;

    const points = [
      new Point(x1, y1),
      new Point(x2, y2),
      new Point(x3, y3),
      new Point(x4, y4),
    ];

    return new Rectangle(
      validationResult.id,
      points[0],
      points[1],
      points[2],
      points[3]
    );
  }
}
