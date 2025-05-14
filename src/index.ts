// import { RectangleManager } from "./managers";

import { Point2D, Rectangle } from "./entities";
import { RectangleManager } from "./managers/RectangleManager";
import { RectangleRepository } from "./repositories/RectangleRepository";
import { Warehouse } from "./warehouse/Warehouse";
const rectangleRepository = new RectangleManager();
const repository = new RectangleRepository(rectangleRepository);

// console.log(repository.getSortedByP1());

const warehouse = Warehouse.getInstance();

repository.attachObserver("1", warehouse);

console.log(warehouse.getProperties("b"));

repository.add(
  new Rectangle(
    "b",
    new Point2D(0, 0),
    new Point2D(6, 0),
    new Point2D(6, 3),
    new Point2D(0, 3)
  )
);

console.log(warehouse.getProperties("b"));
