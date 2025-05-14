import { Figure } from "../entities";

type FigureProperties = {
  area: number;
  volume: number | null;
  perimeter: number | null;
} | null;

export interface IObserver {
  update(id: Figure["id"], properties: FigureProperties): void;
}
