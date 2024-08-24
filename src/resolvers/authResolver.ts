import { registerUser, loginUser } from "../services";
import { generateToken } from "../utils";

export const authResolver = {
  register: async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const user = await registerUser(email, password);
    return { token: generateToken(user.id) };
  },
  login: async ({ email, password }: { email: string; password: string }) => {
    const token = await loginUser(email, password);
    if (!token) throw new Error("Invalid credentials");
    return { token };
  },
};
