import { Logger } from "../logger";

type ParserResult =
  | {
      isValid: false;
    }
  | {
      isValid: true;
      id: string;
      coordinates: number[];
    };

export class InputParser {
  constructor(private readonly coordinatesCount: number) {}

  private buildMessage(line: string, message: string): string {
    return `${line} | Error: ${message}`;
  }

  safeValidateAndParse(line: string): ParserResult {
    try {
      switch (true) {
        case this.validateEmpty(line):
          Logger.error(
            this.buildMessage(line, `Expected line, got empty string`)
          );
          return { isValid: false };

        case !this.validateId(line):
          Logger.error(this.buildMessage(line, `Id not found`));
          return { isValid: false };

        case !this.validateLength(line):
          Logger.error(
            this.buildMessage(
              line,
              `Invalid count of coordinates, expected ${this.coordinatesCount}`
            )
          );
          return { isValid: false };

        case !this.validateNumbers(line):
          Logger.error(this.buildMessage(line, `Coordinates are not numbers`));
          return { isValid: false };

        default: {
          const [id, ...coords] = line.split(" ");
          return { isValid: true, id, coordinates: coords.map(Number) };
        }
      }
    } catch (error) {
      Logger.error(`Error parsing line: ${error}`);
      return { isValid: false };
    }
  }

  private validateEmpty(line: string): boolean {
    return line.trim() === "";
  }

  private validateId(line: string): boolean {
    return /^[a-zA-Z][a-zA-Z0-9]*$/.test(line.split(" ")[0]);
  }

  private validateLength(line: string): boolean {
    const [, ...coords] = line.split(" ");
    return coords.length === this.coordinatesCount;
  }

  private validateNumbers(line: string): boolean {
    const [, ...coords] = line.split(" ");
    return coords.every((value) => !isNaN(Number(value)));
  }
}
