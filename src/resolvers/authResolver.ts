import { registerUser, loginUser } from "../services";
import {
  AuthenticationError,
  generateToken,
  handleResolverError,
} from "../utils";

export const authResolver = {
  register: async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    return handleResolverError(async () => {
      const user = await registerUser(email, password);

      return { token: generateToken(user._id) };
    });
  },
  login: async ({ email, password }: { email: string; password: string }) => {
    return handleResolverError(async () => {
      const token = await loginUser(email, password);

      if (!token) throw new AuthenticationError("Invalid credentials");

      return { token };
    });
  },
};
