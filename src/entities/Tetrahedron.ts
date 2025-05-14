import { Figure } from "./Figure";
import { Point3D } from "./Point3D";

export class Tetrahedron extends Figure<Point3D> {
  constructor(id: string, p1: Point3D, p2: Point3D, p3: Point3D, p4: Point3D) {
    super(id, p1, p2, p3, p4);
  }
}
