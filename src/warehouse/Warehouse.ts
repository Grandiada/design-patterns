import { Figure } from "../entities";
import { IObserver } from "../observer/Observer";

type FigureProperties = {
  area: number | null;
  volume: number | null;
  perimeter: number | null;
};

export class Warehouse implements IObserver {
  private static instance: Warehouse;
  private storage: Map<string, FigureProperties> = new Map();

  private constructor() {}

  public static getInstance(): Warehouse {
    if (!Warehouse.instance) {
      Warehouse.instance = new Warehouse();
    }
    return Warehouse.instance;
  }

  public update(id: Figure["id"], properties: FigureProperties | null): void {
    if (!properties) {
      this.storage.delete(id);
    } else {
      this.storage.set(id, {
        area: properties.area,
        volume: properties.volume,
        perimeter: properties.perimeter,
      });
    }
  }

  public getProperties(figureId: string): FigureProperties | undefined {
    return this.storage.get(figureId);
  }
}
