import { Figure } from "../entities";
import { TetrahedronManager } from "../managers/TetrahedronManager";
import { RectangleService } from "../services";
import { TetrahedronService } from "../services/TetrahedronService";
import { FigureRepository } from "./FigureRepository";

export class TetrahedronRepository extends FigureRepository<TetrahedronManager> {
  constructor(manager: TetrahedronManager) {
    super(manager);
  }

  public notifyObservers(id: string, figure: Figure | null): void {
    this.observers.forEach((observer) => {
      if (!figure) {
        observer.update(id, null);
      } else {
        const service = new RectangleService(figure);
        observer.update(id, {
          area: service.area(),
          volume: null,
          perimeter: service.perimeter(),
        });
      }
    });
  }

  findById(id: string) {
    return this.findFirst({ isSatisfiedBy: (i) => i.id === id });
  }

  getAllValidFigures() {
    return this.findAll({
      isSatisfiedBy: (i) => new TetrahedronService(i).isValid(),
    });
  }
  getAllBySurfaceAreaRange(min: number, max: number) {
    return this.findAll({
      isSatisfiedBy: (i) => {
        const service = new TetrahedronService(i);
        return service.surfaceArea() >= min && service.surfaceArea() <= max;
      },
    });
  }
  getAllByVolumeRange(min: number, max: number) {
    return this.findAll({
      isSatisfiedBy: (i) => {
        const service = new TetrahedronService(i);
        return service.volume() >= min && service.volume() <= max;
      },
    });
  }
}
