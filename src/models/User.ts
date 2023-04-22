import mongoose, { Document } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createJWT(): Promise<string>;
  checkPassword(a: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Please provide name"],
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\. [0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
});

UserSchema.pre<IUser>("save", async function (): Promise<void> {
  if (this.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

UserSchema.methods.createJWT = async function () {
  if (!process.env.JWT_SECRET)
    throw new Error("JWT_SECRET environment variable is not set");

  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

UserSchema.methods.checkPassword = async function (inputPassword: string) {
  const isMatch = await bcrypt.compare(inputPassword, this.password);
  return isMatch;
};

export default mongoose.model("User", UserSchema);
