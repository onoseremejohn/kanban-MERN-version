import { errorHandlerMiddleware as ErrorMiddleware } from "../types.js";
import { StatusCodes } from "http-status-codes";
const errorHandlerMiddleware: ErrorMiddleware = (err, req, res, next) => {
  console.log(err)
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Somethung went wrong try again later",
  };

  if (err.name === "ValidationError" && err.errors) {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  if (err.code && err.code === 11000 && err.keyValue) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field. Please choose another value`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }
  if (err.name === "CastError") {
    customError.msg = `Sorry, we cannot find : ${err.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
  return res.status(customError.statusCode).json({ msg: customError.msg });
};

export default errorHandlerMiddleware;
