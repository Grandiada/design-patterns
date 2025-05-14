import { Creator } from "../creators/Creator";
import fs from "fs";
import { Logger } from "../logger";
import systemPath from "path";
import { InputParser } from "../parsers";
import { Figure } from "../entities/Figure";

export abstract class Manager<F extends Figure> {
  protected abstract path: string;
  protected abstract factory: Creator;
  protected abstract coordinatesLength: number;
  protected abstract analyze(object: F): string;

  protected lines: string[] = [];

  private objects: F[] = [];

  read(): Manager<F> {
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

  safeParse(): Manager<F> {
    this.lines.reduce((acc, line) => {
      const validator = new InputParser(this.coordinatesLength);
      const parseResult = validator.safeValidateAndParse(line);

      if (!parseResult.isValid) {
        return acc;
      }

      const object = this.factory.createObject(
        parseResult.id,
        parseResult.coordinates
      );

      acc.push(object as F);

      return acc;
    }, this.objects);

    return this;
  }

  getObject(id: string): F {
    if (!this.objects.length) {
      throw new Error("No objects found");
    }

    const object = this.objects.find((obj) => obj.id === id);

    if (!object) {
      throw new Error("Object not found");
    }

    return object;
  }

  getObjects(): F[] {
    return this.objects;
  }

  getObjectInfo(id: string): string {
    const object = this.getObject(id);
    return this.analyze(object);
  }
}
