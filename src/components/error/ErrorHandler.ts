import { AppError } from "./index";

export default class ErrorHandler {
  public static async handleError(err: Error) {
    console.log(err);
  }

  public static isTrustedError(error: Error) {
    if (error instanceof AppError) {
      return error.isOperational;
    }
    return false;
  }
}
