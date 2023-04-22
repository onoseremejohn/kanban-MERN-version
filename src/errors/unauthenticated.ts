import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api-error.js";

class UnauthenticatedError extends CustomAPIError {
  statusCode = StatusCodes.UNAUTHORIZED;
  constructor(message: string) {
    super(message);
  }
}

export default UnauthenticatedError;
