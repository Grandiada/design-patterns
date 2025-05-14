import { Figure } from "../entities/Figure";
import { RectangleManager } from "../managers/RectangleManager";
import { RectangleService } from "../services/RectangleService";
import { FigureRepository } from "./FigureRepository";

export class RectangleRepository extends FigureRepository<RectangleManager> {
  constructor(manager: RectangleManager) {
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
      isSatisfiedBy: (i) => new RectangleService(i).isRectangle(),
    });
  }

  getAllBySurfaceAreaRange(min: number, max: number) {
    return this.findAll({
      isSatisfiedBy: (i) => {
        const service = new RectangleService(i);
        return service.area() >= min && service.area() <= max;
      },
    });
  }

  getAllByPerimeterRange(min: number, max: number) {
    return this.findAll({
      isSatisfiedBy: (i) => {
        const service = new RectangleService(i);
        return service.perimeter() >= min && service.perimeter() <= max;
      },
    });
  }
}
