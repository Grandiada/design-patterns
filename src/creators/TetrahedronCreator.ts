import { Tetrahedron } from "../entities/Tetrahedron";
import { Point3D } from "../entities";
import { Creator } from "./Creator";
import { Logger } from "../logger";

export class TetrahedronCreator implements Creator {
  /**
   * Creates a tetrahedron object from the given id and coordinates.
   * @param id - The id of the tetrahedron.
   * @param coordinates - The coordinates of the tetrahedron.
   * @returns A new Tetrahedron object.
   * @throws An error if the number of coordinates is not 12.
   */
  public createObject(id: string, coordinates: number[]): Tetrahedron {
    try {
      if (coordinates.length !== 12) {
        throw new Error(
          `Invalid number of coordinates got ${coordinates.length} expected 12`
        );
      }

      const [x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4] = coordinates;

      const points = [
        new Point3D(x1, y1, z1),
        new Point3D(x2, y2, z2),
        new Point3D(x3, y3, z3),
        new Point3D(x4, y4, z4),
      ];

      return new Tetrahedron(id, points[0], points[1], points[2], points[3]);
    } catch (error) {
      Logger.error(`Error creating tetrahedron: ${error}`);
      throw new Error(`Error creating tetrahedron: ${error}`);
    }
  }
}
