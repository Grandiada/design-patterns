import { TetrahedronManager } from "../managers/TetrahedronManager";
import { TetrahedronService } from "../services/TetrahedronService";
import { FigureRepository } from "./FigureRepository";

export class TetrahedronRepository extends FigureRepository<TetrahedronManager> {
  constructor(manager: TetrahedronManager) {
    super(manager);
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
