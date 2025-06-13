import { TaskComponent } from "../taskComponent";
import { CreateTaskComponentRequest } from "../viewModels/CreateTaskComponentRequest";

export interface Handler {
  setNext(handler: Handler): Handler;
  handle(
    request: CreateTaskComponentRequest,
    component?: TaskComponent
  ): TaskComponent[] | null;
}
