import { Controller } from "../types.js";
import User, { IUser } from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";

const register: Controller = async (req, res) => {
  // await User.create({ ...req.body });
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError("please provide all values");
  }
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("Email already in use");
  }
  await User.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ msg: "Successfully created account" });
};

const login: Controller = async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password))
    throw new BadRequestError("Please provide email and password");
  const user = await User.findOne({ email });
  if (!user) throw new UnauthenticatedError("Invalid Credentials");
  const isPassworCorrect = await (user as IUser).checkPassword(password);
  if (!isPassworCorrect) throw new UnauthenticatedError("Invalid Credentials");
  const token = await (user as IUser).createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

export { register, login };
