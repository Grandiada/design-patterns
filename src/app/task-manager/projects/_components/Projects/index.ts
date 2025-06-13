import { withServerSentProjects } from "@/app/_hocs";
import { Task } from "./Task";

export const Projects = withServerSentProjects(Task);
