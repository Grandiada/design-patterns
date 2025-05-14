import { TetrahedronCreator } from "../creators";
import { Tetrahedron } from "../entities";
import { TetrahedronService } from "../services";
import { Manager } from "./Manager";

export class TetrahedronManager extends Manager<Tetrahedron> {
  public factory = new TetrahedronCreator();
  public path = "src/input/tetrahedrons.txt";
  public coordinatesLength = 12;

  protected analyze(object: Tetrahedron): string {
    const service = new TetrahedronService(object);

    return (
      `Tetrahedron ID: ${object.id}\n` +
      `Surface Area: ${service.surfaceArea()}\n` +
      `Volume: ${service.volume()}\n` +
      `Volume Ratio: ${service.volumeRatio()}\n` +
      `Is Valid: ${service.isValid()}\n` +
      `Base Plane: ${service.getBasePlane()}\n`
    );
  }
}
