import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api-error.js";

class BadRequestError extends CustomAPIError {
  statusCode = StatusCodes.BAD_REQUEST;
  constructor(message: string) {
    super(message);
  }
}

export default BadRequestError;
