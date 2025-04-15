import { Point } from "../entities/Point";

export class VectorMath {
  static vector(p1: Point, p2: Point): number[] {
    return [p2.x - p1.x, p2.y - p1.y, p2.z - p1.z];
  }

  /**
   * Вычисляет векторное произведение (cross product) двух 3D-векторов.
   * @param v1 Первый вектор
   * @param v2 Второй вектор
   * @returns Вектор, перпендикулярный обоим исходным
   */
  static cross(v1: number[], v2: number[]): number[] {
    return [
      v1[1] * v2[2] - v1[2] * v2[1],
      v1[2] * v2[0] - v1[0] * v2[2],
      v1[0] * v2[1] - v1[1] * v2[0],
    ];
  }

  /**
   * Вычисляет скалярное произведение (dot product) двух векторов.
   * @param v1 Первый вектор
   * @param v2 Второй вектор
   * @returns Число — результат скалярного произведения
   */
  static dot(v1: number[], v2: number[]): number {
    return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];
  }

  /**
   * Вычисляет смешанное произведение трёх векторов (scalar triple product).
   * Используется, например, для нахождения объёма тетраэдра.
   * @param v1 Первый вектор
   * @param v2 Второй вектор
   * @param v3 Третий вектор
   * @returns Число — результат смешанного произведения
   */
  static scalarTripleProduct(v1: number[], v2: number[], v3: number[]): number {
    return this.dot(v1, this.cross(v2, v3));
  }
  
  /**
   * Вычисляет площадь треугольника, заданного тремя точками.
   * Использует половину модуля векторного произведения двух сторон.
   * @param a Первая вершина
   * @param b Вторая вершина
   * @param c Третья вершина
   * @returns Площадь треугольника
   */
  static triangleArea(a: Point, b: Point, c: Point): number {
    const ab = this.vector(a, b);
    const ac = this.vector(a, c);
    const crossProduct = this.cross(ab, ac);
    const magnitude = Math.sqrt(
      crossProduct.reduce((sum, x) => sum + x * x, 0)
    );
    return 0.5 * magnitude;
  }

  /**
   * Расстояние между двумя точками в 2D или 3D
   */
  static distance(p1: Point, p2: Point): number {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const dz = (p2.z ?? 0) - (p1.z ?? 0); // поддержка 2D и 3D
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  /**
   * Проверка, параллельны ли два вектора
   */
  static areParallel(v1: number[], v2: number[]): boolean {
    if (v1.length !== v2.length) return false;

    // Проверка пропорциональности компонентов (v1[i] / v2[i] должны быть равны)
    const ratios: number[] = [];

    for (let i = 0; i < v1.length; i++) {
      if (v2[i] === 0 && v1[i] === 0) continue; // обе компоненты 0 — допустимо
      if (v2[i] === 0 || v1[i] === 0) return false; // деление на 0
      ratios.push(v1[i] / v2[i]);
    }

    return ratios.every((r) => Math.abs(r - ratios[0]) < 1e-6);
  }
}
