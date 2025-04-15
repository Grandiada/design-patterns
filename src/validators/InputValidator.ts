import { Logger } from "../logger";

type ValidationResult =
  | {
      isValid: false;
    }
  | {
      isValid: true;
      id: string;
      coordinates: number[];
    };

export class InputValidator {
  constructor(private readonly coordinatesCount: number) {}

  private buildMessage(line: string, message: string): string {
    return `${line} | Error: ${message}`;
  }

  validateAndParse(line: string): ValidationResult {
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
            `Not sufficient coordinates, expected ${this.coordinatesCount}`
          )
        );
        return { isValid: false };

      case !this.validateNumbers(line):
        Logger.error(this.buildMessage(line, `Coordinates are not numbers`));
        return { isValid: false };

      default:
        const [id, ...coords] = line.split(" ");
        return { isValid: true, id, coordinates: coords.map(Number) };
    }
  }

  private validateEmpty(line: string): boolean {
    return line.trim() === "";
  }

  private validateId(line: string): boolean {
    return /^[a-zA-Z][a-zA-Z0-9]*$/.test(line.split(" ")[0]);
  }

  private validateLength(line: string): boolean {
    const [_id, ...coords] = line.split(" ");
    return coords.length === this.coordinatesCount;
  }

  private validateNumbers(line: string): boolean {
    const [_id, ...coords] = line.split(" ");
    return coords.every((value) => !isNaN(Number(value)));
  }
}
