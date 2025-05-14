import { Figure } from "../entities/Figure";

export interface IComparator<T extends Figure = Figure> {
  (a: T, b: T): number;
}
