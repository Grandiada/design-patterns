export interface ICommand {
  type: "add" | "remove" | "move";
  componentId: string;
  targetComponentId: string;
}
