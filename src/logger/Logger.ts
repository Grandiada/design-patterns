import pino from "pino";
import systemPath from "path";

export const Logger = pino({
  name: "design-patterns-homework",
  transport: {
    targets: [
      {
        target: "pino/file",
        options: {
          destination:
            process.env.NODE_ENV === "test"
              ? undefined
              : systemPath.resolve(__dirname, "log.txt"),
          mkdir: process.env.NODE_ENV !== "test",
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
