import { Warehouse } from "../warehouse/Warehouse";
import { Rectangle } from "../entities/Rectangle";
import { Point2D } from "../entities/Point2D";
import { RectangleRepository } from "../repositories/RectangleRepository";
import { RectangleManager } from "../managers/RectangleManager";

describe("Warehouse", () => {
  let warehouse: Warehouse;
  let repository: RectangleRepository;
  let rectangleManager: RectangleManager;

  beforeEach(() => {
    // Reset the singleton instance before each test
    Warehouse.resetInstance();
    warehouse = Warehouse.getInstance();
    rectangleManager = new RectangleManager();
    repository = new RectangleRepository(rectangleManager);
  });

  describe("getInstance", () => {
    it("should return the same instance when called multiple times", () => {
      const instance1 = Warehouse.getInstance();
      const instance2 = Warehouse.getInstance();
      expect(instance1).toBe(instance2);
    });
  });

  describe("update and getProperties", () => {
    it("should store and retrieve figure properties correctly", () => {
      const properties = {
        area: 100,
        volume: null,
        perimeter: 40,
      };

      warehouse.update("test-figure", properties);
      const retrievedProperties = warehouse.getProperties("test-figure");

      expect(retrievedProperties).toEqual(properties);
    });

    it("should return undefined for non-existent figure", () => {
      const properties = warehouse.getProperties("non-existent");
      expect(properties).toBeUndefined();
    });

    it("should delete properties when null is passed to update", () => {
      const properties = {
        area: 100,
        volume: null,
        perimeter: 40,
      };

      warehouse.update("test-figure", properties);
      warehouse.update("test-figure", null);
      const retrievedProperties = warehouse.getProperties("test-figure");

      expect(retrievedProperties).toBeUndefined();
    });
  });

  describe("integration with RectangleRepository", () => {
    it("should update properties when a rectangle is added to repository", () => {
      repository.attachObserver("warehouse", warehouse);

      let properties = warehouse.getProperties("test-rect");

      expect(properties).toBeUndefined();
      const rectangle = new Rectangle(
        "test-rect",
        new Point2D(0, 0),
        new Point2D(4, 0),
        new Point2D(4, 3),
        new Point2D(0, 3)
      );

      repository.add(rectangle);
      properties = warehouse.getProperties("test-rect");

      expect(properties).toBeDefined();
      expect(properties?.area).toBe(12); // 4 * 3 = 12
      expect(properties?.perimeter).toBe(14); // 2 * (4 + 3) = 14
      expect(properties?.volume).toBeNull();
    });
  });
});
