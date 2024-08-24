import bcrypt from "bcryptjs";

import UserModel from "../models/User";
import { User } from "../types";
import { generateToken } from "../utils/generateToken";
import { hashPassword } from "../utils/hashPassword";

export const registerUser = async (
  email: string,
  password: string
): Promise<User> => {
  const hashedPassword = await hashPassword(password);
  const user = new UserModel({ email, password: hashedPassword });
  return user.save();
};

export const loginUser = async (
  email: string,
  password: string
): Promise<string | null> => {
  const user = await UserModel.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    return generateToken(user._id.toString());
  }

  return null;
};
