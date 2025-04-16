import { Point3D } from "./Point3D";

export class Tetrahedron {
  constructor(
    public readonly id: string,
    public readonly a: Point3D,
    public readonly b: Point3D,
    public readonly c: Point3D,
    public readonly d: Point3D
  ) {}
}
