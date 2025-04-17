import pino from "pino";
import systemPath from "path";

export const Logger = pino({
  name: "design-patterns-homework",
  transport: {
    targets: process.env.NODE_ENV === "test" ? [] : [
      {
        target: "pino/file", 
        options: {
          destination: systemPath.resolve(__dirname, "log.txt"),
          mkdir: true,
          append: false,
          sync: true
        },
      },
      {
        target: "pino-pretty",
        options: {
          colorize: true
        }
      }
    ]
  }
});
