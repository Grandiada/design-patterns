import { Point2D } from "../entities/Point2D";
import { Rectangle } from "../entities/Rectangle";
import { Logger } from "../logger";
import { Creator } from "./Creator";

export class RectangleCreator implements Creator {
  /**
   * Creates a rectangle object from the given id and coordinates.
   * @param id - The id of the rectangle.
   * @param coordinates - The coordinates of the rectangle.
   * @returns A new Rectangle object.
   * @throws An error if the number of coordinates is not 8.
   */
  public createObject(id: string, coordinates: number[]): Rectangle {
    try {
      if (coordinates.length !== 8) {
        throw new Error(
          `Invalid number of coordinates got ${coordinates.length} expected 8`
        );
      }

      const [x1, y1, x2, y2, x3, y3, x4, y4] = coordinates;

      const points = [
        new Point2D(x1, y1),
        new Point2D(x2, y2),
        new Point2D(x3, y3),
        new Point2D(x4, y4),
      ];

      return new Rectangle(id, points[0], points[1], points[2], points[3]);
    } catch (error) {
      Logger.error(`Error creating rectangle: ${error}`);
      throw new Error(`Error creating rectangle: ${error}`);
    }
  }
}
