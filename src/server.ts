import app from "./app";
import { ErrorHandler } from "./components/error";

const server = app.listen(8081);

process.on("unhandledRejection", (reason: string) => {
  throw reason;
});

process.on("uncaughtException", (error: Error) => {
  ErrorHandler.handleError(error);
  if (!ErrorHandler.isTrustedError(error)) {
    server.close(() => {
      process.exit(1);
    });
  }
});
