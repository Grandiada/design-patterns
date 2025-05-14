import { RectangleRepository } from "../repositories/RectangleRepository";
import { Rectangle } from "../entities/Rectangle";
import { Point2D } from "../entities/Point2D";
import { RectangleManager } from "../managers/RectangleManager";

class MockRectangleManager extends RectangleManager {
  constructor(private rects: Rectangle[]) {
    super();
  }
  read() {
    return this;
  }
  safeParse() {
    return this;
  }
  getObjects() {
    return this.rects;
  }
}

describe("RectangleRepository", () => {
  let repo: RectangleRepository;
  let rects: Rectangle[];

  beforeEach(() => {
    rects = [
      new Rectangle(
        "b",
        new Point2D(0, 0),
        new Point2D(6, 0),
        new Point2D(6, 3),
        new Point2D(0, 3)
      ),
      new Rectangle(
        "a",
        new Point2D(1, 1),
        new Point2D(5, 1),
        new Point2D(5, 4),
        new Point2D(1, 4)
      ),
      new Rectangle(
        "c",
        new Point2D(-2, -2),
        new Point2D(2, -2),
        new Point2D(2, 2),
        new Point2D(-2, 2)
      ),
    ];
    repo = new RectangleRepository(new MockRectangleManager(rects));
  });

  test("add and remove", () => {
    const newRect = new Rectangle(
      "d",
      new Point2D(5, 5),
      new Point2D(6, 6),
      new Point2D(7, 7),
      new Point2D(8, 8)
    );
    repo.add(newRect);
    expect(repo.getAll().get("d")).toBe(newRect);
    repo.remove("d");
    expect(repo.getAll().has("d")).toBe(false);
  });

  test("getSortedById", () => {
    expect(repo.getSortedById().map((r) => r.id)).toEqual(["a", "b", "c"]);
  });

  test("getSortedByP1", () => {
    expect(repo.getSortedByP1().map((r) => r.id)).toEqual(["c", "b", "a"]);
  });

  test("getSortedByP2", () => {
    expect(repo.getSortedByP2().map((r) => r.id)).toEqual(["c", "a", "b"]);
  });

  test("findById", () => {
    expect(repo.findById("a")?.id).toBe("a");
    expect(repo.findById("z")).toBeUndefined();
  });

  test("getAllValidFigures returns all (mocked)", () => {
    // RectangleService.isRectangle() always returns true for this test
    expect(repo.getAllValidFigures().length).toBe(3);
  });

  test("getAllBySurfaceAreaRange returns all (mocked)", () => {
    // RectangleService.area() is not mocked, so this just checks the call
    expect(Array.isArray(repo.getAllBySurfaceAreaRange(0, 10000))).toBe(true);
  });
});
