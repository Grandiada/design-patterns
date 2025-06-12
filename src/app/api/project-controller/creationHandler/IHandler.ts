import { TaskComponent } from "../types";
import { CreateTaskComponentRequest } from "./CreateTaskComponentRequest";

export interface Handler {
  setNext(handler: Handler): Handler;
  handle(
    request: CreateTaskComponentRequest,
    component?: TaskComponent
  ): TaskComponent[] | null;
}
