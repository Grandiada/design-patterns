import { Tetrahedron } from "../entities/Tetrahedron";
import { Point3D } from "../entities";

export class TetrahedronService {
  constructor(private tetrahedron: Tetrahedron) {}

  private vector(p1: Point3D, p2: Point3D): number[] {
    return [p2.x - p1.x, p2.y - p1.y, p2.z - p1.z];
  }

  private cross(v1: number[], v2: number[]): number[] {
    return [
      v1[1] * v2[2] - v1[2] * v2[1],
      v1[2] * v2[0] - v1[0] * v2[2],
      v1[0] * v2[1] - v1[1] * v2[0],
    ];
  }

  private dot(v1: number[], v2: number[]): number {
    return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];
  }

  private scalarTripleProduct(
    v1: number[],
    v2: number[],
    v3: number[]
  ): number {
    return this.dot(v1, this.cross(v2, v3));
  }

  private triangleArea(a: Point3D, b: Point3D, c: Point3D): number {
    const ab = this.vector(a, b);
    const ac = this.vector(a, c);
    const crossProduct = this.cross(ab, ac);
    const magnitude = Math.sqrt(
      crossProduct.reduce((sum, x) => sum + x * x, 0)
    );
    return 0.5 * magnitude;
  }

  volume(): number {
    return this.getVolume(
      this.tetrahedron.a,
      this.tetrahedron.b,
      this.tetrahedron.c,
      this.tetrahedron.d
    );
  }

  private getVolume(a: Point3D, b: Point3D, c: Point3D, d: Point3D): number {
    const ab = this.vector(a, b);
    const ac = this.vector(a, c);
    const ad = this.vector(a, d);

    const scalarTriple = this.scalarTripleProduct(ab, ac, ad);
    return Math.abs(scalarTriple) / 6;
  }

  isValid(): boolean {
    return this.volume() > 0;
  }

  getBasePlane(): "XY" | "XZ" | "YZ" | "None" {
    // Check XY plane (z coordinates)
    const zCoords = [
      this.tetrahedron.a.z,
      this.tetrahedron.b.z,
      this.tetrahedron.c.z,
      this.tetrahedron.d.z,
    ];
    const zCounts = new Map<number, number>();
    for (const z of zCoords) {
      zCounts.set(z, (zCounts.get(z) || 0) + 1);
    }
    if (Array.from(zCounts.values()).some((count) => count === 3)) {
      return "XY";
    }

    // Check XZ plane (y coordinates)
    const yCoords = [
      this.tetrahedron.a.y,
      this.tetrahedron.b.y,
      this.tetrahedron.c.y,
      this.tetrahedron.d.y,
    ];
    const yCounts = new Map<number, number>();
    for (const y of yCoords) {
      yCounts.set(y, (yCounts.get(y) || 0) + 1);
    }
    if (Array.from(yCounts.values()).some((count) => count === 3)) {
      return "XZ";
    }

    // Check YZ plane (x coordinates)
    const xCoords = [
      this.tetrahedron.a.x,
      this.tetrahedron.b.x,
      this.tetrahedron.c.x,
      this.tetrahedron.d.x,
    ];
    const xCounts = new Map<number, number>();
    for (const x of xCoords) {
      xCounts.set(x, (xCounts.get(x) || 0) + 1);
    }
    if (Array.from(xCounts.values()).some((count) => count === 3)) {
      return "YZ";
    }

    return "None";
  }

  // площадь поверхности: сумма площадей треугольников
  surfaceArea(): number {
    // If the tetrahedron is flat (volume = 0), return 0
    if (!this.isValid()) {
      return 0;
    }

    const triangles = [
      [this.tetrahedron.a, this.tetrahedron.b, this.tetrahedron.c],
      [this.tetrahedron.a, this.tetrahedron.b, this.tetrahedron.d],
      [this.tetrahedron.a, this.tetrahedron.c, this.tetrahedron.d],
      [this.tetrahedron.b, this.tetrahedron.c, this.tetrahedron.d],
    ];

    return triangles
      .map((tri) => this.triangleArea(tri[0], tri[1], tri[2]))
      .reduce((acc, val) => acc + val, 0);
  }

  private intersectWithCoordPlane(
    a: Point3D,
    b: Point3D,
    axis: "x" | "y" | "z"
  ): Point3D | null {
    const fa = a[axis];
    const fb = b[axis];

    if (fa * fb > 0 || fa === fb) return null;

    const t = -fa / (fb - fa);
    return new Point3D(
      a.x + t * (b.x - a.x),
      a.y + t * (b.y - a.y),
      a.z + t * (b.z - a.z)
    );
  }

  /**
   * Calculates the ratio of volumes created by intersecting the tetrahedron with a coordinate plane
   * @returns The ratio of volumes (V1:V2) or 0 if the tetrahedron is not intersected by the plane
   */

  volumeRatio(): number {
    const { ratio: ratioX } = this.splitTetrahedronByCoordPlane("x");
    const { ratio: ratioY } = this.splitTetrahedronByCoordPlane("y");
    const { ratio: ratioZ } = this.splitTetrahedronByCoordPlane("z");

    return Math.max(ratioX, ratioY, ratioZ);
  }

  private splitTetrahedronByCoordPlane(axis: "x" | "y" | "z"): {
    under: number;
    above: number;
    ratio: number;
  } {
    const { a, b, c, d } = this.tetrahedron;
    const vertices = [a, b, c, d];
    const under: Point3D[] = [];
    const over: Point3D[] = [];
    const intersections: Point3D[] = [];

    for (const v of vertices) {
      if (v[axis] < 0) {
        under.push(v);
      } else {
        over.push(v);
      }
    }

    if (under.length === 0 || over.length === 0) {
      const vol = this.getVolume(a, b, c, d);
      return {
        under: under.length === 4 ? vol : 0,
        above: under.length === 4 ? 0 : vol,
        ratio: under.length === 4 ? Infinity : 0,
      };
    }

    for (let i = 0; i < 4; i++) {
      for (let j = i + 1; j < 4; j++) {
        const p = this.intersectWithCoordPlane(vertices[i], vertices[j], axis);
        if (p) intersections.push(p);
      }
    }

    const totalVolume = this.getVolume(a, b, c, d);
    let underVolume = 0;

    if (under.length === 1) {
      underVolume = this.getVolume(
        under[0],
        intersections[0],
        intersections[1],
        intersections[2]
      );
    } else if (under.length === 2) {
      underVolume =
        this.getVolume(under[0], under[1], intersections[0], intersections[1]) +
        this.getVolume(under[0], intersections[1], intersections[2], under[1]);
    } else if (under.length === 3) {
      const upperVolume = this.getVolume(
        over[0],
        intersections[0],
        intersections[1],
        intersections[2]
      );
      underVolume = totalVolume - upperVolume;
    }

    return {
      under: underVolume,
      above: totalVolume - underVolume,
      ratio: underVolume / (totalVolume - underVolume),
    };
  }
}
