import { Creator } from "../creators/Creator";

export abstract class Reader<T extends Creator> {
  abstract path: string;
  abstract factory: Creator;

  abstract read(): Reader<T>;

  abstract parse(): Reader<T>;

  abstract getObject(
    id: NonNullable<ReturnType<T["createObject"]>>["id"]
  ): NonNullable<ReturnType<T["createObject"]>>;

  abstract getObjects(): NonNullable<ReturnType<T["createObject"]>>[];
}
