import { RectangleCreator } from "../creators/RectangleCreator";
import { TetrahedronCreator } from "../creators/TetrahedronCreator";
import { Rectangle } from "../entities/Rectangle";
import { Tetrahedron } from "../entities/Tetrahedron";
import { Point2D } from "../entities/Point2D";
import { Point3D } from "../entities/Point3D";

describe("Creators", () => {
  describe("RectangleCreator", () => {
    let creator: RectangleCreator;

    beforeEach(() => {
      creator = new RectangleCreator();
    });

    test("should create a valid rectangle with correct coordinates", () => {
      const id = "R1";
      const coordinates = [0, 0, 4, 0, 4, 3, 0, 3];
      const rectangle = creator.createObject(id, coordinates);

      expect(rectangle).toBeInstanceOf(Rectangle);
      expect(rectangle.id).toBe(id);
      expect(rectangle.p1).toEqual(new Point2D(0, 0));
      expect(rectangle.p2).toEqual(new Point2D(4, 0));
      expect(rectangle.p3).toEqual(new Point2D(4, 3));
      expect(rectangle.p4).toEqual(new Point2D(0, 3));
    });

    test("should throw error for insufficient coordinates", () => {
      const id = "R1";
      const coordinates = [0, 0, 4, 0, 4, 3]; // Only 6 coordinates

      expect(() => creator.createObject(id, coordinates)).toThrow(
        "Invalid number of coordinates got 6 expected 8"
      );
    });

    test("should throw error for extra coordinates", () => {
      const id = "R1";
      const coordinates = [0, 0, 4, 0, 4, 3, 0, 3, 0, 0]; // 10 coordinates

      expect(() => creator.createObject(id, coordinates)).toThrow(
        "Invalid number of coordinates got 10 expected 8"
      );
    });

    test("should handle decimal coordinates", () => {
      const id = "R1";
      const coordinates = [0.5, 0.5, 4.5, 0.5, 4.5, 3.5, 0.5, 3.5];
      const rectangle = creator.createObject(id, coordinates);

      expect(rectangle.p1).toEqual(new Point2D(0.5, 0.5));
      expect(rectangle.p2).toEqual(new Point2D(4.5, 0.5));
      expect(rectangle.p3).toEqual(new Point2D(4.5, 3.5));
      expect(rectangle.p4).toEqual(new Point2D(0.5, 3.5));
    });

    test("should handle negative coordinates", () => {
      const id = "R1";
      const coordinates = [-2, -2, 2, -2, 2, 2, -2, 2];
      const rectangle = creator.createObject(id, coordinates);

      expect(rectangle.p1).toEqual(new Point2D(-2, -2));
      expect(rectangle.p2).toEqual(new Point2D(2, -2));
      expect(rectangle.p3).toEqual(new Point2D(2, 2));
      expect(rectangle.p4).toEqual(new Point2D(-2, 2));
    });
  });

  describe("TetrahedronCreator", () => {
    let creator: TetrahedronCreator;

    beforeEach(() => {
      creator = new TetrahedronCreator();
    });

    test("should create a valid tetrahedron with correct coordinates", () => {
      const id = "T1";
      const coordinates = [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1];
      const tetrahedron = creator.createObject(id, coordinates);

      expect(tetrahedron).toBeInstanceOf(Tetrahedron);
      expect(tetrahedron.id).toBe(id);
      expect(tetrahedron.p1).toEqual(new Point3D(0, 0, 0));
      expect(tetrahedron.p2).toEqual(new Point3D(1, 0, 0));
      expect(tetrahedron.p3).toEqual(new Point3D(0, 1, 0));
      expect(tetrahedron.p4).toEqual(new Point3D(0, 0, 1));
    });

    test("should throw error for insufficient coordinates", () => {
      const id = "T1";
      const coordinates = [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0]; // Only 11 coordinates

      expect(() => creator.createObject(id, coordinates)).toThrow(
        "Invalid number of coordinates got 11 expected 12"
      );
    });

    test("should throw error for extra coordinates", () => {
      const id = "T1";
      const coordinates = [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0]; // 14 coordinates

      expect(() => creator.createObject(id, coordinates)).toThrow(
        "Invalid number of coordinates got 14 expected 12"
      );
    });

    test("should handle decimal coordinates", () => {
      const id = "T1";
      const coordinates = [0.5, 0.5, 0.5, 1.5, 0.5, 0.5, 0.5, 1.5, 0.5, 0.5, 0.5, 1.5];
      const tetrahedron = creator.createObject(id, coordinates);

      expect(tetrahedron.p1).toEqual(new Point3D(0.5, 0.5, 0.5));
      expect(tetrahedron.p2).toEqual(new Point3D(1.5, 0.5, 0.5));
      expect(tetrahedron.p3).toEqual(new Point3D(0.5, 1.5, 0.5));
      expect(tetrahedron.p4).toEqual(new Point3D(0.5, 0.5, 1.5));
    });

    test("should handle negative coordinates", () => {
      const id = "T1";
      const coordinates = [-1, -1, -1, 1, -1, -1, -1, 1, -1, -1, -1, 1];
      const tetrahedron = creator.createObject(id, coordinates);

      expect(tetrahedron.p1).toEqual(new Point3D(-1, -1, -1));
      expect(tetrahedron.p2).toEqual(new Point3D(1, -1, -1));
      expect(tetrahedron.p3).toEqual(new Point3D(-1, 1, -1));
      expect(tetrahedron.p4).toEqual(new Point3D(-1, -1, 1));
    });

    test("should handle mixed positive and negative coordinates", () => {
      const id = "T1";
      const coordinates = [-1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1, 1];
      const tetrahedron = creator.createObject(id, coordinates);

      expect(tetrahedron.p1).toEqual(new Point3D(-1, 1, -1));
      expect(tetrahedron.p2).toEqual(new Point3D(1, -1, 1));
      expect(tetrahedron.p3).toEqual(new Point3D(-1, 1, -1));
      expect(tetrahedron.p4).toEqual(new Point3D(1, -1, 1));
    });
  });
}); 