import { withServerSentProjects } from "./withServerSentConnection";
import { Task } from "./Task";

export const Projects = withServerSentProjects(Task);
