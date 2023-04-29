import jwt from "jsonwebtoken";
import { Controller, JwtPayload } from "../types.js";
import { UnauthenticatedError } from "../errors/index.js";
import User from "../models/User.js";

const auth: Controller = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer "))
    throw new UnauthenticatedError("Authentication invalid");

  const token = authHeader.split(" ")[1];
  if (!process.env.JWT_SECRET)
    throw new Error("JWT_SECRET environment variable is not set");
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    const user = await User.findById(payload.userId);
    if (!user) throw new UnauthenticatedError("Authentication invalid");
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

export default auth;
