import { RectangleReader } from "./readers";

const reader = new RectangleReader().read();

reader.parse();

const rectangles = reader.getObjects();

console.log(rectangles);
