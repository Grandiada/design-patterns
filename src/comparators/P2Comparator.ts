import { Tetrahedron } from "../entities";
import { Rectangle } from "../entities/Rectangle";
import { IComparator } from "./IComparator";

export const P2Comparator: IComparator = (a, b) => {
  if (a instanceof Rectangle && b instanceof Rectangle) {
    return a.p2.x - b.p2.x || a.p2.y - b.p2.y;
  }
  if (a instanceof Tetrahedron && b instanceof Tetrahedron) {
    return a.p2.x - b.p2.x || a.p2.y - b.p2.y || a.p2.z - b.p2.z;
  }
  return 0;
};
