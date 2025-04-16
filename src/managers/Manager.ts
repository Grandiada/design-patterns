import { Creator } from "../creators/Creator";
import fs from "fs";
import { Logger } from "../logger";
import systemPath from "path";
import { InputParser } from "../parsers";

export abstract class Manager<T extends Creator> {
  abstract path: string;
  abstract factory: Creator;
  abstract coordinatesLength: number;
  protected abstract analyze(object: ReturnType<T["createObject"]>): string;

  protected lines: string[] = [];
  private objects: ReturnType<T["createObject"]>[] = [];

  read(): Manager<T> {
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

  safeParse(): Manager<T> {
    this.objects = this.lines.reduce((acc, line) => {
      const validator = new InputParser(this.coordinatesLength);
      const parseResult = validator.safeValidateAndParse(line);

      if (!parseResult.isValid) {
        return acc;
      }

      const object = this.factory.createObject(
        parseResult.id,
        parseResult.coordinates
      );

      acc.push(object as ReturnType<T["createObject"]>);

      return acc;
    }, [] as ReturnType<T["createObject"]>[]);

    return this;
  }

  getObject(id: string): ReturnType<T["createObject"]> {
    if (!this.objects.length) {
      throw new Error("No objects found");
    }

    const object = this.objects.find((obj) => obj.id === id);

    if (!object) {
      throw new Error("Object not found");
    }

    return object;
  }

  getObjects(): ReturnType<T["createObject"]>[] {
    return this.objects;
  }

  getObjectInfo(id: string): string {
    const object = this.getObject(id);
    return this.analyze(object);
  }
}
