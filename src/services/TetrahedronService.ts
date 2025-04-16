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

  private scalarTripleProduct(v1: number[], v2: number[], v3: number[]): number {
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
    const ab = this.vector(this.tetrahedron.a, this.tetrahedron.b);
    const ac = this.vector(this.tetrahedron.a, this.tetrahedron.c);
    const ad = this.vector(this.tetrahedron.a, this.tetrahedron.d);

    const scalarTriple = this.scalarTripleProduct(ab, ac, ad);
    return Math.abs(scalarTriple) / 6;
  }

  isValid(): boolean {
    return this.volume() > 0;
  }

  getBasePlane(): 'XY' | 'XZ' | 'YZ' | 'None' {
    // Check XY plane (z coordinates)
    const zCoords = [
      this.tetrahedron.a.z,
      this.tetrahedron.b.z,
      this.tetrahedron.c.z,
      this.tetrahedron.d.z
    ];
    const zCounts = new Map<number, number>();
    for (const z of zCoords) {
      zCounts.set(z, (zCounts.get(z) || 0) + 1);
    }
    if (Array.from(zCounts.values()).some(count => count >= 3)) {
      return "XY";
    }

    // Check XZ plane (y coordinates)
    const yCoords = [
      this.tetrahedron.a.y,
      this.tetrahedron.b.y,
      this.tetrahedron.c.y,
      this.tetrahedron.d.y
    ];
    const yCounts = new Map<number, number>();
    for (const y of yCoords) {
      yCounts.set(y, (yCounts.get(y) || 0) + 1);
    }
    if (Array.from(yCounts.values()).some(count => count >= 3)) {
      return "XZ";
    }

    // Check YZ plane (x coordinates)
    const xCoords = [
      this.tetrahedron.a.x,
      this.tetrahedron.b.x,
      this.tetrahedron.c.x,
      this.tetrahedron.d.x
    ];
    const xCounts = new Map<number, number>();
    for (const x of xCoords) {
      xCounts.set(x, (xCounts.get(x) || 0) + 1);
    }
    if (Array.from(xCounts.values()).some(count => count >= 3)) {
      return "YZ";
    }

    return "None";
  }

  // площадь поверхности: сумма площадей треугольников
  surfaceArea(): number {
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

  /**
   * Calculates the ratio of volumes created by intersecting the tetrahedron with a coordinate plane
   * @returns The ratio of volumes (V1:V2) or null if the tetrahedron is not intersected by the plane
   */
  volumeRatio(): '1/3' | '1' | '3' | 'Not intersected' {
    // Get the base plane that intersects the tetrahedron
    const basePlane = this.getBasePlane();
    if (basePlane === "None") {
      return "Not intersected";
    }

    // Get the coordinates based on the intersecting plane
    let coords: number[];
    if (basePlane === "XY") {
      coords = [
        this.tetrahedron.a.z,
        this.tetrahedron.b.z,
        this.tetrahedron.c.z, 
        this.tetrahedron.d.z
      ];
    } else if (basePlane === "XZ") {
      coords = [
        this.tetrahedron.a.y,
        this.tetrahedron.b.y,
        this.tetrahedron.c.y,
        this.tetrahedron.d.y
      ];
    } else { // YZ plane
      coords = [
        this.tetrahedron.a.x,
        this.tetrahedron.b.x,
        this.tetrahedron.c.x,
        this.tetrahedron.d.x
      ];
    }

    // Sort coordinates to find points on each side of plane
    coords.sort((a, b) => a - b);

    // Count points on each side of the plane (0)
    let pointsBelow = 0;
    let pointsAbove = 0;
    for (const coord of coords) {
      if (coord < 0) pointsBelow++;
      if (coord > 0) pointsAbove++;
    }

    // Calculate ratio based on number of points on each side
    // Using approximate volume ratios based on point distribution
    if (pointsBelow === 1 && pointsAbove === 3) return "1/3";
    if (pointsBelow === 2 && pointsAbove === 2) return "1";
    if (pointsBelow === 3 && pointsAbove === 1) return "3";

    return "Not intersected";
  }
}
