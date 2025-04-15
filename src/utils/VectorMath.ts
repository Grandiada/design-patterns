import { Point } from "../entities/Point";

export class VectorMath {
  static vector(p1: Point, p2: Point): number[] {
    return [p2.x - p1.x, p2.y - p1.y, p2.z - p1.z];
  }

  static cross(v1: number[], v2: number[]): number[] {
    return [
      v1[1] * v2[2] - v1[2] * v2[1],
      v1[2] * v2[0] - v1[0] * v2[2],
      v1[0] * v2[1] - v1[1] * v2[0],
    ];
  }

  static dot(v1: number[], v2: number[]): number {
    return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];
  }

  static scalarTripleProduct(v1: number[], v2: number[], v3: number[]): number {
    return this.dot(v1, this.cross(v2, v3));
  }

  static triangleArea(a: Point, b: Point, c: Point): number {
    const ab = this.vector(a, b);
    const ac = this.vector(a, c);
    const crossProduct = this.cross(ab, ac);
    const magnitude = Math.sqrt(
      crossProduct.reduce((sum, x) => sum + x * x, 0)
    );
    return 0.5 * magnitude;
  }
}
