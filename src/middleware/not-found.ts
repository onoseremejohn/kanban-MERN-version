import { Controller } from "../types.js";
import { StatusCodes } from "http-status-codes";

const notFound: Controller = (req, res) =>
  res.status(StatusCodes.NOT_FOUND).send("Route does not exist");

export default notFound;
