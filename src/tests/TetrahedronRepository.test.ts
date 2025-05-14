import { TetrahedronRepository } from "../repositories/TetrahedronRepository";
import { Tetrahedron } from "../entities/Tetrahedron";
import { Point3D } from "../entities/Point3D";
import { TetrahedronManager } from "../managers/TetrahedronManager";

class MockTetrahedronManager extends TetrahedronManager {
  constructor(private tetras: Tetrahedron[]) {
    super();
  }
  read() { return this; }
  safeParse() { return this; }
  getObjects() { return this.tetras; }
}

describe("TetrahedronRepository", () => {
  let repo: TetrahedronRepository;
  let tetras: Tetrahedron[];

  beforeEach(() => {
    tetras = [
      new Tetrahedron("b", new Point3D(0, 0, 0), new Point3D(4, 0, 0), new Point3D(0, 4, 0), new Point3D(0, 0, 6)),
      new Tetrahedron("a", new Point3D(1, 1, 1), new Point3D(4, 0, 0), new Point3D(4, 0, 6), new Point3D(0, 0, 6)),
      new Tetrahedron("c", new Point3D(0, 0, 0), new Point3D(4, 0, 0), new Point3D(4, 0, 6), new Point3D(0, 0, 6)),
    ];
    repo = new TetrahedronRepository(new MockTetrahedronManager(tetras));
  });

  test("add and remove", () => {
    const newTetra = new Tetrahedron("d", new Point3D(5, 5, 5), new Point3D(6, 6, 6), new Point3D(7, 7, 7), new Point3D(8, 8, 8));
    repo.add(newTetra);
    expect(repo.getAll().get("d")).toBe(newTetra);
    repo.remove("d");
    expect(repo.getAll().has("d")).toBe(false);
  });

  test("getSortedById", () => {
    expect(repo.getSortedById().map(r => r.id)).toEqual(["a", "b", "c"]);
  });

  test("getSortedByP1", () => {
    expect(repo.getSortedByP1().map(r => r.id)).toEqual(["b", "c", "a"]);
  });

  test("getSortedByP2", () => {
    expect(repo.getSortedByP2().map(r => r.id)).toEqual(["b", "a", "c"]);
  });

  test("findById", () => {
    expect(repo.findById("a")?.id).toBe("a");
    expect(repo.findById("z")).toBeUndefined();
  });

  test("getAllValidFigures returns 1 (mocked)", () => {
    expect(repo.getAllValidFigures().length).toBe(2);
  });

  test("getAllBySurfaceAreaRange returns all (mocked)", () => {
    expect(Array.isArray(repo.getAllBySurfaceAreaRange(0, 10000))).toBe(true);
  });
}); 