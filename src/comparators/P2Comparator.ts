import { IComparator } from "./IComparator";

export const P2Comparator: IComparator = (a, b) => {
  return a.p2.x - b.p2.x || a.p2.y - b.p2.y;
};
