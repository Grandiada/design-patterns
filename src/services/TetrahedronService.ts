import { Tetrahedron } from "../entities/Tetrahedron";
import { VectorMath } from "../utils/VectorMath";

export class TetrahedronService {
  static volume(t: Tetrahedron): number {
    const ab = VectorMath.vector(t.a, t.b);
    const ac = VectorMath.vector(t.a, t.c);
    const ad = VectorMath.vector(t.a, t.d);

    const scalarTriple = VectorMath.scalarTripleProduct(ab, ac, ad);
    return Math.abs(scalarTriple) / 6;
  }

  static isValidTetrahedron(t: Tetrahedron): boolean {
    return this.volume(t) > 0;
  }

  static isBaseOnXY(t: Tetrahedron): boolean {
    const base = [t.a.z, t.b.z, t.c.z];
    return base.every((z) => z === 0);
  }

  // площадь поверхности: сумма площадей треугольников
  static surfaceArea(t: Tetrahedron): number {
    const triangles = [
      [t.a, t.b, t.c],
      [t.a, t.b, t.d],
      [t.a, t.c, t.d],
      [t.b, t.c, t.d],
    ];

    return triangles
      .map((tri) => VectorMath.triangleArea(tri[0], tri[1], tri[2]))
      .reduce((acc, val) => acc + val, 0);
  }
}
