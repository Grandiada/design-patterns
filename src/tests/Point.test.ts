import { Point2D, Point3D } from "../entities/index";

describe("Point2D", () => {
  test("should create a Point2D with correct coordinates", () => {
    const point = new Point2D(1, 2);
    expect(point.x).toBe(1);
    expect(point.y).toBe(2);
  });

  test("should create multiple Point2D instances with different coordinates", () => {
    const point1 = new Point2D(1, 2);
    const point2 = new Point2D(3, 4);
    expect(point1.x).not.toBe(point2.x);
    expect(point1.y).not.toBe(point2.y);
  });
});

describe("Point3D", () => {
  test("should create a Point3D with correct coordinates", () => {
    const point = new Point3D(1, 2, 3);
    expect(point.x).toBe(1);
    expect(point.y).toBe(2);
    expect(point.z).toBe(3);
  });

  test("should create a Point3D with default z coordinate", () => {
    const point = new Point3D(1, 2);
    expect(point.x).toBe(1);
    expect(point.y).toBe(2);
    expect(point.z).toBe(0);
  });

  test("should inherit from Point2D", () => {
    const point = new Point3D(1, 2, 3);
    expect(point).toBeInstanceOf(Point2D);
  });
}); 