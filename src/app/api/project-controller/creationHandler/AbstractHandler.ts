import { TaskComponent } from "../taskComponent";
import { CreateTaskComponentRequest } from "../viewModels/CreateTaskComponentRequest";
import { Handler } from "./IHandler";

export abstract class AbstractHandler implements Handler {
  private nextHandler: Handler | null = null;

  public setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  public handle(
    request: CreateTaskComponentRequest,
    component?: TaskComponent
  ): TaskComponent[] | null {
    if (this.nextHandler) {
      return this.nextHandler.handle(request, component);
    }

    return null;
  }
}
