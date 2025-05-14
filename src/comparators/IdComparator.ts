import { IComparator } from "./IComparator";

export const IdComparator: IComparator = (a, b) => {
  return a.id.localeCompare(b.id);
};
