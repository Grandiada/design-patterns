import { RectangleService } from "../services/RectangleService";
import { Rectangle, Point2D } from "../entities";

describe("RectangleService", () => {
  let square: Rectangle;
  let rectangle: Rectangle;
  let rhombus: Rectangle;
  let trapezoid: Rectangle;
  let nonConvex: Rectangle;

  beforeEach(() => {
    // Square
    square = new Rectangle(
      "square",
      new Point2D(0, 0),
      new Point2D(1, 0),
      new Point2D(1, 1),
      new Point2D(0, 1)
    );

    // Rectangle
    rectangle = new Rectangle(
      "rectangle",
      new Point2D(0, 0),
      new Point2D(2, 0),
      new Point2D(2, 1),
      new Point2D(0, 1)
    );

    // Rhombus
    rhombus = new Rectangle(
      "rhombus",
      new Point2D(0, 0),
      new Point2D(2, 1),
      new Point2D(4, 0),
      new Point2D(2, -1)
    );

    // Trapezoid
    trapezoid = new Rectangle(
      "trapezoid",
      new Point2D(0, 0),
      new Point2D(2, 0),
      new Point2D(1.5, 1),
      new Point2D(0.5, 1)
    );

    // Non-convex quadrilateral
    nonConvex = new Rectangle(
      "nonConvex",
      new Point2D(0, 0),
      new Point2D(2, 0),
      new Point2D(1, 1),
      new Point2D(1, -1)
    );
  });

  describe("perimeter", () => {
    test("should calculate correct perimeter for square", () => {
      const service = new RectangleService(square);
      expect(service.perimeter()).toBe(4);
    });

    test("should calculate correct perimeter for rectangle", () => {
      const service = new RectangleService(rectangle);
      expect(service.perimeter()).toBe(6);
    });
  });

  describe("area", () => {
    test("should calculate correct area for square", () => {
      const service = new RectangleService(square);
      expect(service.area()).toBe(1);
    });

    test("should calculate correct area for rectangle", () => {
      const service = new RectangleService(rectangle);
      expect(service.area()).toBe(2);
    });
  });

  describe("isRectangle", () => {
    test("should return true for square", () => {
      const service = new RectangleService(square);
      expect(service.isRectangle()).toBe(true);
    });

    test("should return true for rectangle", () => {
      const service = new RectangleService(rectangle);
      expect(service.isRectangle()).toBe(true);
    });

    test("should return false for rhombus", () => {
      const service = new RectangleService(rhombus);
      expect(service.isRectangle()).toBe(false);
    });
  });

  describe("isSquare", () => {
    test("should return true for square", () => {
      const service = new RectangleService(square);
      expect(service.isSquare()).toBe(true);
    });

    test("should return false for rectangle", () => {
      const service = new RectangleService(rectangle);
      expect(service.isSquare()).toBe(false);
    });
  });

  describe("isRhombus", () => {
    test("should return true for square", () => {
      const service = new RectangleService(square);
      expect(service.isRhombus()).toBe(true);
    });

    test("should return true for rhombus", () => {
      const service = new RectangleService(rhombus);
      expect(service.isRhombus()).toBe(true);
    });

    test("should return false for rectangle", () => {
      const service = new RectangleService(rectangle);
      expect(service.isRhombus()).toBe(false);
    });
  });

  describe("isTrapezoid", () => {
    test("should return true for trapezoid", () => {
      const service = new RectangleService(trapezoid);
      expect(service.isTrapezoid()).toBe(true);
    });

    test("should return false for square", () => {
      const service = new RectangleService(square);
      expect(service.isTrapezoid()).toBe(false);
    });
  });

  describe("isConvex", () => {
    test("should return true for convex shapes", () => {
      const squareService = new RectangleService(square);
      const rectangleService = new RectangleService(rectangle);
      const rhombusService = new RectangleService(rhombus);
      const trapezoidService = new RectangleService(trapezoid);

      expect(squareService.isConvex()).toBe(true);
      expect(rectangleService.isConvex()).toBe(true);
      expect(rhombusService.isConvex()).toBe(true);
      expect(trapezoidService.isConvex()).toBe(true);
    });

    test("should return false for non-convex shape", () => {
      const service = new RectangleService(nonConvex);
      expect(service.isConvex()).toBe(false);
    });
  });
}); 