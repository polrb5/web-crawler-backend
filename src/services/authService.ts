import bcrypt from 'bcryptjs';

import { ERROR_MESSAGES } from '../constants';
import { UserModel } from '../models';
import { User } from '../types';
import { AuthenticationError, generateToken, hashPassword } from '../utils';
import { userSchema } from '../validation';

export const registerUser = async (
  email: string,
  password: string,
): Promise<User> => {
  try {
    await userSchema.validate({ email, password }, { abortEarly: false });

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new AuthenticationError(ERROR_MESSAGES.USER_ALREADY_EXISTS);
    }

    const hashedPassword = await hashPassword(password);
    const user = new UserModel({ email, password: hashedPassword });

    return await user.save();
  } catch (error) {
    throw new AuthenticationError(
      error instanceof Error ? error.message : ERROR_MESSAGES.UNEXPECTED_ERROR,
    );
  }
};

export const loginUser = async (
  email: string,
  password: string,
): Promise<string> => {
  try {
    await userSchema.validate({ email, password }, { abortEarly: false });

    const user = await UserModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new AuthenticationError(ERROR_MESSAGES.INVALID_EMAIL_OR_PASSWORD);
    }

    return generateToken(user._id.toString());
  } catch (error) {
    throw new AuthenticationError(
      error instanceof Error ? error.message : ERROR_MESSAGES.UNEXPECTED_ERROR,
    );
  }
};
