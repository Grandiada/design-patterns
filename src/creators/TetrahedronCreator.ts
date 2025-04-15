import { Tetrahedron } from "../entities/Tetrahedron";
import { Point } from "../entities/Point";
import { Creator } from "./Creator";
import { InputParser } from "../parsers/InputParser";

export class TetrahedronFactory implements Creator {
  public createObject(line: string): Tetrahedron | undefined {
    const validator = new InputParser(12);
    const validationResult = validator.validateAndParse(line);

    if (!validationResult.isValid) {
      return;
    }

    const [x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4] =
      validationResult.coordinates;

    const points = [
      new Point(x1, y1, z1),
      new Point(x2, y2, z2),
      new Point(x3, y3, z3),
      new Point(x4, y4, z4),
    ];

    return new Tetrahedron(
      validationResult.id,
      points[0],
      points[1],
      points[2],
      points[3]
    );
  }
}
