import { Point } from './Point';

export class Tetrahedron {
  constructor(
    public readonly id: string,
    public readonly a: Point,
    public readonly b: Point,
    public readonly c: Point,
    public readonly d: Point
  ) {}
}
