import { Rectangle, Tetrahedron } from "../entities";
import { IComparator } from "./IComparator";

export const P1Comparator: IComparator = (a, b) => {
  if (a instanceof Rectangle && b instanceof Rectangle) {
    return a.p1.x - b.p1.x || a.p1.y - b.p1.y;
  }
  if (a instanceof Tetrahedron && b instanceof Tetrahedron) {
    return a.p1.x - b.p1.x || a.p1.y - b.p1.y || a.p1.z - b.p1.z;
  }
  return 0;
};
