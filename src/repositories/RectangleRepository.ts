import { RectangleManager } from "../managers/RectangleManager";
import { RectangleService } from "../services/RectangleService";
import { FigureRepository } from "./FigureRepository";

export class RectangleRepository extends FigureRepository<RectangleManager> {
  constructor(manager: RectangleManager) {
    super(manager);
  }

  analize(id: string) {
    return this.manager.getObjectInfo(id);
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
