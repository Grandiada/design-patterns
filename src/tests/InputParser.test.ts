import { InputParser } from "../parsers/InputParser";

describe("InputParser", () => {
  let parser: InputParser;

  beforeEach(() => {
    parser = new InputParser(12); // 12 coordinates for tetrahedron
  });

  describe("safeValidateAndParse", () => {
    test("should parse valid tetrahedron data", () => {
      const result = parser.safeValidateAndParse("T1 0 0 0 1 0 0 0 1 0 0 0 1");
      expect(result.isValid).toBe(true);
      if (result.isValid) {
        expect(result.id).toBe("T1");
        expect(result.coordinates).toEqual([0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1]);
      }
    });

    test("should handle empty line", () => {
      const result = parser.safeValidateAndParse("");
      expect(result.isValid).toBe(false);
    });

    test("should handle line with only whitespace", () => {
      const result = parser.safeValidateAndParse("   ");
      expect(result.isValid).toBe(false);
    });

    test("should reject invalid ID format", () => {
      const result = parser.safeValidateAndParse("1T 0 0 0 1 0 0 0 1 0 0 0 1");
      expect(result.isValid).toBe(false);
    });

    test("should reject line with insufficient coordinates", () => {
      const result = parser.safeValidateAndParse("T1 0 0 0 1 0 0 0 1 0 0 0");
      expect(result.isValid).toBe(false);
    });

    test("should reject line with extra coordinates", () => {
      const result = parser.safeValidateAndParse("T1 0 0 0 1 0 0 0 1 0 0 0 1 2");
      expect(result.isValid).toBe(false);
    });

    test("should reject non-numeric coordinates", () => {
      const result = parser.safeValidateAndParse("T1 0 0 0 1 0 0 0 1 0 0 0 a");
      expect(result.isValid).toBe(false);
    });

    test("should handle decimal numbers", () => {
      const result = parser.safeValidateAndParse("T1 0.5 0.5 0.5 1.5 0.5 0.5 0.5 1.5 0.5 0.5 0.5 1.5");
      expect(result.isValid).toBe(true);
      if (result.isValid) {
        expect(result.coordinates).toEqual([0.5, 0.5, 0.5, 1.5, 0.5, 0.5, 0.5, 1.5, 0.5, 0.5, 0.5, 1.5]);
      }
    });

    test("should handle negative numbers", () => {
      const result = parser.safeValidateAndParse("T1 -1 -1 -1 1 -1 -1 -1 1 -1 -1 -1 1");
      expect(result.isValid).toBe(true);
      if (result.isValid) {
        expect(result.coordinates).toEqual([-1, -1, -1, 1, -1, -1, -1, 1, -1, -1, -1, 1]);
      }
    });

    test("should handle mixed positive and negative numbers", () => {
      const result = parser.safeValidateAndParse("T1 -1 1 -1 1 -1 1 -1 1 -1 1 -1 1");
      expect(result.isValid).toBe(true);
      if (result.isValid) {
        expect(result.coordinates).toEqual([-1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1, 1]);
      }
    });
  });

  describe("validateId", () => {
    test("should accept valid IDs", () => {
      expect(parser["validateId"]("T1")).toBe(true);
      expect(parser["validateId"]("Tetrahedron1")).toBe(true);
      expect(parser["validateId"]("T123")).toBe(true);
      expect(parser["validateId"]("T")).toBe(true);
    });

    test("should reject invalid IDs", () => {
      expect(parser["validateId"]("1T")).toBe(false);
      expect(parser["validateId"]("T-1")).toBe(false);
      expect(parser["validateId"]("")).toBe(false);
    });
  });

  describe("validateLength", () => {
    test("should accept correct number of coordinates", () => {
      expect(parser["validateLength"]("T1 0 0 0 1 0 0 0 1 0 0 0 1")).toBe(true);
    });

    test("should reject incorrect number of coordinates", () => {
      expect(parser["validateLength"]("T1 0 0 0 1 0 0 0 1 0 0 0")).toBe(false);
      expect(parser["validateLength"]("T1 0 0 0 1 0 0 0 1 0 0 0 1 2")).toBe(false);
    });
  });

  describe("validateNumbers", () => {
    test("should accept valid numeric coordinates", () => {
      expect(parser["validateNumbers"]("T1 0 0 0 1 0 0 0 1 0 0 0 1")).toBe(true);
      expect(parser["validateNumbers"]("T1 0.5 0.5 0.5 1.5 0.5 0.5 0.5 1.5 0.5 0.5 0.5 1.5")).toBe(true);
      expect(parser["validateNumbers"]("T1 -1 -1 -1 1 -1 -1 -1 1 -1 -1 -1 1")).toBe(true);
    });

    test("should reject non-numeric coordinates", () => {
      expect(parser["validateNumbers"]("T1 0 0 0 1 0 0 0 1 0 0 0 a")).toBe(false);
      expect(parser["validateNumbers"]("T1 0 0 0 1 0 0 0 1 0 0 0 1.2.3")).toBe(false);
      expect(parser["validateNumbers"]("T1 0 0 0 1 0 0 0 1 0 0 0 NaN")).toBe(false);
    });
  });
}); 