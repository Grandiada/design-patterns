import { Project } from "../types";
import { Creator } from "./ICreator";

export class ProjectCreator implements Creator {
  public createObject(name: string, description: string): Project {
    return new Project(name, description);
  }
}
