import { RectangleCreator } from "../creators/RectangleCreator";
import { Rectangle } from "../entities/Rectangle";
import { Reader } from "./Reader";
import fs from "fs";
import { Logger } from "../logger";
import systemPath from "path";

export class RectangleReader implements Reader<RectangleCreator> {
  public factory: RectangleCreator = new RectangleCreator();
  public path: string = "src/input/rectangles.txt";
  private objects: Rectangle[] = [];
  private lines: string[] = [];

  read(): Reader<RectangleCreator> {
    try {
      const data = fs.readFileSync(
        systemPath.resolve(process.cwd(), this.path),
        "utf8"
      );
      this.lines = data.split("\n");
    } catch (error) {
      Logger.error(`Error reading file: ${error}`);
      throw new Error(`Error reading file: ${this.path} \n ${error}`);
    }

    return this;
  }

  parse(): Reader<RectangleCreator> {
    this.objects = this.lines.reduce((acc, line) => {
      const object = this.factory.createObject(line.trim());
      if (object) {
        acc.push(object);
      }

      return acc;
    }, [] as Rectangle[]);

    return this;
  }

  getObject(id: string): Rectangle {
    if (!this.objects.length) {
      throw new Error("No objects found");
    }

    const object = this.objects.find((obj) => obj.id === id);

    if (!object) {
      throw new Error("Object not found");
    }

    return object;
  }

  getObjects(): Rectangle[] {
    return this.objects;
  }
}
