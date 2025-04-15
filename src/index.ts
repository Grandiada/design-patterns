import { RectangleReader } from "./readers";
import { RectangleService } from "./services";

const reader = new RectangleReader().read();

reader.parse();

const rectangle = reader.getObject("Square");
console.log(rectangle, RectangleService.isSquare(rectangle));

const convex = reader.getObject("Rectangle3");
console.log(convex, RectangleService.isRectangle(convex));
