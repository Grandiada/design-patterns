export type CreateTaskComponentRequest = {
  name: string;
  description: string;
  type: "task" | "project";
  parentId?: string;
};
