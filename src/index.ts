// import { RectangleManager } from "./managers";

import { RectangleManager } from "./managers/RectangleManager";
import { RectangleRepository } from "./repositories/RectangleRepository";
const rectangleRepository = new RectangleManager();
const repository = new RectangleRepository(rectangleRepository);

console.log(repository.getSortedByP1());

console.log(repository.analize("Perimetr14"));
