import { Rectangle } from "../entities";

export class RectangleService {
  constructor(private rect: Rectangle) {}

  perimeter(): number {
    const { p1, p2, p3, p4 } = this.rect;

    // Calculate distances between consecutive points
    const side1 = Math.sqrt(
      Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)
    );
    const side2 = Math.sqrt(
      Math.pow(p3.x - p2.x, 2) + Math.pow(p3.y - p2.y, 2)
    );
    const side3 = Math.sqrt(
      Math.pow(p4.x - p3.x, 2) + Math.pow(p4.y - p3.y, 2)
    );
    const side4 = Math.sqrt(
      Math.pow(p1.x - p4.x, 2) + Math.pow(p1.y - p4.y, 2)
    );

    return side1 + side2 + side3 + side4;
  }

  area(): number {
    const { p1, p2, p3, p4 } = this.rect;
    // Split rectangle into two triangles and sum their areas
    const area1 = Math.abs(
      (p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y)) / 2
    );
    const area2 = Math.abs(
      (p1.x * (p3.y - p4.y) + p3.x * (p4.y - p1.y) + p4.x * (p1.y - p3.y)) / 2
    );

    return area1 + area2;
  }

  isRectangle(): boolean {
    const { p1, p2, p3, p4 } = this.rect;

    // Calculate vectors between consecutive points
    const v1x = p2.x - p1.x;
    const v1y = p2.y - p1.y;
    const v2x = p3.x - p2.x;
    const v2y = p3.y - p2.y;
    const v3x = p4.x - p3.x;
    const v3y = p4.y - p3.y;
    const v4x = p1.x - p4.x;
    const v4y = p1.y - p4.y;

    // Check if adjacent sides are perpendicular using dot product
    const dot1 = v1x * v2x + v1y * v2y;
    const dot2 = v2x * v3x + v2y * v3y;
    const dot3 = v3x * v4x + v3y * v4y;
    const dot4 = v4x * v1x + v4y * v1y;

    // All dot products should be close to 0 for perpendicular vectors
    const epsilon = 1e-6;
    return (
      Math.abs(dot1) < epsilon &&
      Math.abs(dot2) < epsilon &&
      Math.abs(dot3) < epsilon &&
      Math.abs(dot4) < epsilon
    );
  }

  isSquare(): boolean {
    if (!this.isRectangle()) return false;
    return this.isRhombus();
  }

  isRhombus(): boolean {
    const { p1, p2, p3, p4 } = this.rect;

    // Calculate side lengths
    const side1 = Math.sqrt(
      Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)
    );
    const side2 = Math.sqrt(
      Math.pow(p3.x - p2.x, 2) + Math.pow(p3.y - p2.y, 2)
    );
    const side3 = Math.sqrt(
      Math.pow(p4.x - p3.x, 2) + Math.pow(p4.y - p3.y, 2)
    );
    const side4 = Math.sqrt(
      Math.pow(p1.x - p4.x, 2) + Math.pow(p1.y - p4.y, 2)
    );

    // Check if all sides are equal
    const epsilon = 1e-6;
    return (
      Math.abs(side1 - side2) < epsilon &&
      Math.abs(side2 - side3) < epsilon &&
      Math.abs(side3 - side4) < epsilon
    );
  }

  isTrapezoid(): boolean {
    const { p1, p2, p3, p4 } = this.rect;

    // Calculate vectors for each side
    const v1x = p2.x - p1.x;
    const v1y = p2.y - p1.y;
    const v2x = p3.x - p2.x;
    const v2y = p3.y - p2.y;
    const v3x = p4.x - p3.x;
    const v3y = p4.y - p3.y;
    const v4x = p1.x - p4.x;
    const v4y = p1.y - p4.y;

    // Check if opposite sides are parallel
    // Using slope comparison: dy1/dx1 = dy2/dx2
    const epsilon = 1e-6;

    // Check first pair of opposite sides
    const areFirstPairParallel = 
      (Math.abs(v1x) < epsilon && Math.abs(v3x) < epsilon) || // Vertical lines
      (Math.abs(v1y) < epsilon && Math.abs(v3y) < epsilon) || // Horizontal lines
      Math.abs(v1y/v1x - v3y/v3x) < epsilon; // General case

    // Check second pair of opposite sides
    const areSecondPairParallel = 
      (Math.abs(v2x) < epsilon && Math.abs(v4x) < epsilon) || // Vertical lines
      (Math.abs(v2y) < epsilon && Math.abs(v4y) < epsilon) || // Horizontal lines
      Math.abs(v2y/v2x - v4y/v4x) < epsilon; // General case

    // A trapezoid has exactly one pair of parallel sides
    return (areFirstPairParallel && !areSecondPairParallel) ||
           (!areFirstPairParallel && areSecondPairParallel);
  }

  isConvex(): boolean {
    const { p1, p2, p3, p4 } = this.rect;
    // Calculate cross products for each consecutive pair of edges
    // For a convex polygon, all cross products should have the same sign
    const crossProduct1 = (p2.x - p1.x) * (p3.y - p2.y) - (p2.y - p1.y) * (p3.x - p2.x);
    const crossProduct2 = (p3.x - p2.x) * (p4.y - p3.y) - (p3.y - p2.y) * (p4.x - p3.x);
    const crossProduct3 = (p4.x - p3.x) * (p1.y - p4.y) - (p4.y - p3.y) * (p1.x - p4.x);
    const crossProduct4 = (p1.x - p4.x) * (p2.y - p1.y) - (p1.y - p4.y) * (p2.x - p1.x);

    // All cross products should be either all positive or all negative for a convex polygon
    return (
      (crossProduct1 > 0 && crossProduct2 > 0 && crossProduct3 > 0 && crossProduct4 > 0) ||
      (crossProduct1 < 0 && crossProduct2 < 0 && crossProduct3 < 0 && crossProduct4 < 0)
    );
  }
}
