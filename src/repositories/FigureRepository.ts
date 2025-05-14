import { IdComparator, P1Comparator, P2Comparator } from "../comparators";
import { IComparator } from "../comparators/IComparator";
import { Figure } from "../entities/Figure";
import { Manager } from "../managers/Manager";

interface ISpecification<T extends Figure> {
  isSatisfiedBy(item: T): boolean;
}

export abstract class FigureRepository<
  M extends Manager<F>,
  F extends Figure = M extends Manager<infer T> ? T : never
> {
  protected objects: Map<string, F> = new Map();

  constructor(protected readonly manager: M) {
    this.manager.read().safeParse();
    this.manager.getObjects().reduce((acc, item) => {
      acc.set(item.id, item);
      return acc;
    }, this.objects);
  }

  // Abstract methods
  abstract findById(id: string): F | undefined;
  abstract getAllValidFigures(): F[];
  abstract getAllBySurfaceAreaRange(min: number, max: number): F[] | undefined;
  
  // Public methods
  public add(item: F): void {
    if (this.objects.has(item.id)) {
      throw new Error("Object already exists");
    }
    this.objects.set(item.id, item as F);
  }

  public remove(id: string): void {
    if (!this.objects.has(id)) {
      throw new Error("Object not found");
    }
    this.objects.delete(id);
  }

  public getAll(): Map<string, F> {
    return this.objects;
  }

  public getSortedById(): F[] {
    return this.toList(IdComparator);
  }

  public getSortedByP1(): F[] {
    return this.toList(P1Comparator);
  }

  public getSortedByP2(): F[] {
    return this.toList(P2Comparator);
  }

  // Protected methods
  protected findFirst(specification: ISpecification<F>): F | undefined {
    return Array.from(this.objects.values()).find((item) =>
      specification.isSatisfiedBy(item)
    );
  }

  protected findAll(specification?: ISpecification<F>): F[] {
    return Array.from(this.objects.values()).filter((item) => {
      if (specification) {
        return specification.isSatisfiedBy(item);
      }
      return true;
    });
  }

  // Private methods
  private toList(comparator: IComparator<F>): F[] {
    return Array.from(this.objects.values()).sort(comparator);
  }
}
