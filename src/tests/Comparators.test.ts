import { IdComparator, P1Comparator, P2Comparator } from "../comparators";
import { Rectangle } from "../entities/Rectangle";
import { Point2D } from "../entities/Point2D";

describe("Comparators", () => {
  const rects = [
    new Rectangle("b", new Point2D(2, 2), new Point2D(3, 3), new Point2D(4, 4), new Point2D(5, 5)),
    new Rectangle("a", new Point2D(1, 1), new Point2D(2, 2), new Point2D(3, 3), new Point2D(4, 4)),
    new Rectangle("c", new Point2D(0, 0), new Point2D(1, 1), new Point2D(2, 2), new Point2D(3, 3)),
  ];

  test("IdComparator sorts by id", () => {
    const sorted = [...rects].sort(IdComparator);
    expect(sorted.map(r => r.id)).toEqual(["a", "b", "c"]);
  });

  test("P1Comparator sorts by p1.x then p1.y", () => {
    const sorted = [...rects].sort(P1Comparator);
    expect(sorted.map(r => r.id)).toEqual(["c", "a", "b"]);
  });

  test("P2Comparator sorts by p2.x then p2.y", () => {
    const sorted = [...rects].sort(P2Comparator);
    expect(sorted.map(r => r.id)).toEqual(["c", "a", "b"]);
  });
}); 