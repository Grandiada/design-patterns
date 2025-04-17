import { Rectangle, Tetrahedron, Point2D, Point3D } from "../entities/index";

describe("Rectangle", () => {
  test("should create a Rectangle with correct points", () => {
    const p1 = new Point2D(0, 0);
    const p2 = new Point2D(1, 0);
    const p3 = new Point2D(1, 1);
    const p4 = new Point2D(0, 1);
    const rect = new Rectangle("rect1", p1, p2, p3, p4);

    expect(rect.id).toBe("rect1");
    expect(rect.p1).toBe(p1);
    expect(rect.p2).toBe(p2);
    expect(rect.p3).toBe(p3);
    expect(rect.p4).toBe(p4);
  });

  test("should create multiple Rectangle instances with different points", () => {
    const rect1 = new Rectangle(
      "rect1",
      new Point2D(0, 0),
      new Point2D(1, 0),
      new Point2D(1, 1),
      new Point2D(0, 1)
    );
    const rect2 = new Rectangle(
      "rect2",
      new Point2D(0, 0),
      new Point2D(2, 0),
      new Point2D(2, 2),
      new Point2D(0, 2)
    );

    expect(rect1.id).not.toBe(rect2.id);
    expect(rect1.p2.x).not.toBe(rect2.p2.x);
    expect(rect1.p3.y).not.toBe(rect2.p3.y);
  });
});

describe("Tetrahedron", () => {
  test("should create a Tetrahedron with correct points", () => {
    const a = new Point3D(0, 0, 0);
    const b = new Point3D(1, 0, 0);
    const c = new Point3D(0, 1, 0);
    const d = new Point3D(0, 0, 1);
    const tetra = new Tetrahedron("tetra1", a, b, c, d);

    expect(tetra.id).toBe("tetra1");
    expect(tetra.a).toBe(a);
    expect(tetra.b).toBe(b);
    expect(tetra.c).toBe(c);
    expect(tetra.d).toBe(d);
  });

  test("should create multiple Tetrahedron instances with different points", () => {
    const tetra1 = new Tetrahedron(
      "tetra1",
      new Point3D(0, 0, 0),
      new Point3D(1, 0, 0),
      new Point3D(0, 1, 0),
      new Point3D(0, 0, 1)
    );
    const tetra2 = new Tetrahedron(
      "tetra2",
      new Point3D(0, 0, 0),
      new Point3D(2, 0, 0),
      new Point3D(0, 2, 0),
      new Point3D(0, 0, 2)
    );

    expect(tetra1.id).not.toBe(tetra2.id);
    expect(tetra1.b.x).not.toBe(tetra2.b.x);
    expect(tetra1.c.y).not.toBe(tetra2.c.y);
    expect(tetra1.d.z).not.toBe(tetra2.d.z);
  });
}); 