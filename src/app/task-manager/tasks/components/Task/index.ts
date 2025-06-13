import { withServerSentProjects } from "@/app/_hocs";
import { Task } from "./Task";

export const Tasks = withServerSentProjects(Task);
