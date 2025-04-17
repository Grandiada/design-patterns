import { TetrahedronService } from "../services/TetrahedronService";
import { Tetrahedron, Point3D } from "../entities";

describe("TetrahedronService", () => {
  let regularTetrahedron: Tetrahedron;
  let flatTetrahedron: Tetrahedron;
  let xyPlaneTetrahedron: Tetrahedron;
  let xzPlaneTetrahedron: Tetrahedron;
  let yzPlaneTetrahedron: Tetrahedron;
  let invalidTetrahedron: Tetrahedron;
  let splitVolume1Tetrahedron: Tetrahedron;
  let splitVolume2Tetrahedron: Tetrahedron;

  beforeEach(() => {
    // Regular tetrahedron
    regularTetrahedron = new Tetrahedron(
      "regular",
      new Point3D(1, 1, 1),
      new Point3D(1, -1, -1),
      new Point3D(-1, 1, -1),
      new Point3D(-1, -1, 1)
    );

    // Flat tetrahedron (invalid)
    flatTetrahedron = new Tetrahedron(
      "flat",
      new Point3D(0, 0, 0),
      new Point3D(1, 0, 0),
      new Point3D(0, 1, 0),
      new Point3D(0.5, 0.5, 0)
    );

    // Tetrahedron with base on XY plane
    xyPlaneTetrahedron = new Tetrahedron(
      "xy",
      new Point3D(0, 0, 0),
      new Point3D(1, 0, 0),
      new Point3D(0, 1, 0),
      new Point3D(0.5, 0.5, 1)
    );

    // Tetrahedron with base on XZ plane
    xzPlaneTetrahedron = new Tetrahedron(
      "xz",
      new Point3D(0, 0, 0),
      new Point3D(1, 0, 0), 
      new Point3D(0, 0, 1),
      new Point3D(0.5, 1, 0.5)
    );

    // Tetrahedron with base on YZ plane
    yzPlaneTetrahedron = new Tetrahedron(
      "yz",
      new Point3D(0, 0, 0),
      new Point3D(0, 5, 0),
      new Point3D(0, 0, 1),
      new Point3D(1, -0.5, 0.5)
    );

    // Invalid tetrahedron (all points in a line)
    invalidTetrahedron = new Tetrahedron(
      "invalid",
      new Point3D(0, 0, 0),
      new Point3D(1, 0, 0),
      new Point3D(2, 0, 0),
      new Point3D(3, 0, 0)
    );

    splitVolume1Tetrahedron = new Tetrahedron(
      "splitVolume1",
      new Point3D(0, -2, 0),
      new Point3D(0, -5, 0),
      new Point3D(2, -1, 0),
      new Point3D(0, 5, 3)
    );

    splitVolume2Tetrahedron = new Tetrahedron(
      "splitVolume2",
      new Point3D(3, -2, 0),
      new Point3D(3, -5, 0),
      new Point3D(2, -1, 0),
      new Point3D(3, 10, 3)
    );

  });

  describe("volume", () => {
    test("should calculate correct volume for regular tetrahedron", () => {
      const service = new TetrahedronService(regularTetrahedron);
      // Volume of a regular tetrahedron with edge length 1 is 1/6
      expect(service.volume()).toBeCloseTo(2.6666666666666665);
    });

    test("should return 0 for flat tetrahedron", () => {
      const service = new TetrahedronService(flatTetrahedron);
      expect(service.volume()).toBe(0);
    });

    test("should return 0 for invalid tetrahedron", () => {
      const service = new TetrahedronService(invalidTetrahedron);
      expect(service.volume()).toBe(0);
    });
  });

  describe("isValid", () => {
    test("should return true for valid tetrahedron", () => {
      const service = new TetrahedronService(regularTetrahedron);
      expect(service.isValid()).toBe(true);
    });

    test("should return false for flat tetrahedron", () => {
      const service = new TetrahedronService(flatTetrahedron);
      expect(service.isValid()).toBe(false);
    });

    test("should return false for invalid tetrahedron", () => {
      const service = new TetrahedronService(invalidTetrahedron);
      expect(service.isValid()).toBe(false);
    });
  });

  describe("getBasePlane", () => {
    test("should return XY for tetrahedron with base on XY plane", () => {
      const service = new TetrahedronService(xyPlaneTetrahedron);
      expect(service.getBasePlane()).toBe("XY");
    });

    test("should return XZ for tetrahedron with base on XZ plane", () => {
      const service = new TetrahedronService(xzPlaneTetrahedron);
      expect(service.getBasePlane()).toBe("XZ");
    });

    test("should return YZ for tetrahedron with base on YZ plane", () => {
      const service = new TetrahedronService(yzPlaneTetrahedron);
      expect(service.getBasePlane()).toBe("YZ");
    });

    test("should return None for tetrahedron without a base plane", () => {
      const service = new TetrahedronService(regularTetrahedron);
      expect(service.getBasePlane()).toBe("None");
    });
  });

  describe("surfaceArea", () => {
    test("should calculate correct surface area for regular tetrahedron", () => {
      const service = new TetrahedronService(regularTetrahedron);
      // Surface area of a regular tetrahedron with edge length 1 is √3
      expect(service.surfaceArea()).toBeCloseTo(13.8564064605510);
    });

    test("should return 0 for flat tetrahedron", () => {
      const service = new TetrahedronService(flatTetrahedron);
      expect(service.surfaceArea()).toBe(0);
    });
  });

  describe("volumeRatio", () => {
    test("should return correct ratio for tetrahedron intersected by XY plane", () => {
      const service = new TetrahedronService(splitVolume1Tetrahedron);
      expect(service.volumeRatio()).toBe(2.3600000000000003);
    });

    test("should return correct ratio for tetrahedron intersected by XZ plane", () => {
      const service = new TetrahedronService(splitVolume2Tetrahedron);
      expect(service.volumeRatio()).toBe(0.9799999999999994);
    });

    test("should return Not intersected for regular tetrahedron", () => {
      const service = new TetrahedronService(regularTetrahedron);
      expect(service.volumeRatio()).toBe(0.3333333333333333);
    });
  });
}); 