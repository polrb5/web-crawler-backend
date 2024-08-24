import bcrypt from "bcryptjs";

import { UserModel } from "../models";
import { User } from "../types";
import {
  AuthenticationError,
  generateToken,
  hashPassword,
  ValidationError,
} from "../utils";

export const registerUser = async (
  email: string,
  password: string
): Promise<User> => {
  if (!email || !password) {
    throw new ValidationError("Email and password must be provided");
  }

  const hashedPassword = await hashPassword(password);
  const user = new UserModel({ email, password: hashedPassword });

  return user.save();
};

export const loginUser = async (
  email: string,
  password: string
): Promise<string> => {
  const user = await UserModel.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new AuthenticationError("Invalid email or password");
  }

  return generateToken(user._id.toString());
};
