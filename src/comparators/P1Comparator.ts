import { IComparator } from "./IComparator";

export const P1Comparator: IComparator = (a, b) => {
  return a.p1.x - b.p1.x || a.p1.y - b.p1.y;
};
