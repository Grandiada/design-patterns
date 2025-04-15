import { Rectangle } from "../entities";
import { VectorMath } from "../utils/VectorMath";

export class RectangleService {
  static perimeter(rect: Rectangle): number {
    const { p1, p2, p3, p4 } = rect;

    return (
      VectorMath.distance(p1, p2) +
      VectorMath.distance(p2, p3) +
      VectorMath.distance(p3, p4) +
      VectorMath.distance(p4, p1)
    );
  }

  static area(rect: Rectangle): number {
    const { p1, p2, p3, p4 } = rect;

    // Площадь — разбиение на 2 треугольника
    return (
      VectorMath.triangleArea(p1, p2, p3) + VectorMath.triangleArea(p1, p3, p4)
    );
  }

  static isRectangle(rect: Rectangle): boolean {
    const { p1, p2, p3, p4 } = rect;

    const v1 = VectorMath.vector(p1, p2);
    const v2 = VectorMath.vector(p2, p3);
    const v3 = VectorMath.vector(p3, p4);
    const v4 = VectorMath.vector(p4, p1);

    // Проверка: смежные стороны перпендикулярны (скалярное произведение = 0)
    const dot1 = VectorMath.dot(v1, v2);
    const dot2 = VectorMath.dot(v2, v3);
    const dot3 = VectorMath.dot(v3, v4);
    const dot4 = VectorMath.dot(v4, v1);

    return dot1 === 0 && dot2 === 0 && dot3 === 0 && dot4 === 0;
  }

  static isSquare(rect: Rectangle): boolean {
    if (!this.isRectangle(rect)) return false;

    const { p1, p2, p3, p4 } = rect;

    const side1 = VectorMath.distance(p1, p2);
    const side2 = VectorMath.distance(p2, p3);
    const side3 = VectorMath.distance(p3, p4);
    const side4 = VectorMath.distance(p4, p1);

    return side1 === side2 && side2 === side3 && side3 === side4;
  }

  static isRhombus(rect: Rectangle): boolean {
    const { p1, p2, p3, p4 } = rect;

    const sides = [
      VectorMath.distance(p1, p2),
      VectorMath.distance(p2, p3),
      VectorMath.distance(p3, p4),
      VectorMath.distance(p4, p1),
    ];

    const first = sides[0];
    return sides.every((s) => Math.abs(s - first) < 1e-6);
  }

  static isTrapezoid(rect: Rectangle): boolean {
    const { p1, p2, p3, p4 } = rect;

    const v1 = VectorMath.vector(p1, p2);
    const v2 = VectorMath.vector(p3, p4);

    const v3 = VectorMath.vector(p2, p3);
    const v4 = VectorMath.vector(p4, p1);

    const areParallel1 = VectorMath.areParallel(v1, v2);
    const areParallel2 = VectorMath.areParallel(v3, v4);

    return areParallel1 !== areParallel2;
  }

  static isConvex(rect: Rectangle): boolean {
    const { p1, p2, p3, p4 } = rect;

    const points = [p1, p2, p3, p4];
    const signs: number[] = [];

    for (let i = 0; i < 4; i++) {
      const a = points[i];
      const b = points[(i + 1) % 4];
      const c = points[(i + 2) % 4];

      const ab = VectorMath.vector(a, b);
      const bc = VectorMath.vector(b, c);

      const crossZ = ab[0] * bc[1] - ab[1] * bc[0];

      signs.push(Math.sign(crossZ));
    }

    // Все знаки должны быть одинаковыми (все повороты в одну сторону)
    return signs.every((s) => s === signs[0]);
  }
}
