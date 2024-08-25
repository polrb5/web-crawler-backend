import bcrypt from "bcryptjs";
import { ValidationError } from "yup";

import { ERROR_MESSAGES } from "../../src/constants";
import { UserModel } from "../../src/models";
import { registerUser, loginUser } from "../../src/services";
import { hashPassword } from "../../src/utils";
import { mockUser } from "../mocks";

jest.mock("../../src/models");
jest.mock("bcryptjs");
jest.mock("../../src/utils/hashPassword");

describe("Auth Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should register a new user", async () => {
    const mockHashedPassword = "hashedpassword123";
    (hashPassword as jest.Mock).mockResolvedValue(mockHashedPassword);

    const mockSave = jest
      .fn()
      .mockResolvedValue({ ...mockUser, password: mockHashedPassword });

    (UserModel as unknown as jest.Mock).mockImplementation(() => ({
      save: mockSave,
    }));

    const user = await registerUser(mockUser.email, "password123");

    expect(hashPassword).toHaveBeenCalledWith("password123");
    expect(UserModel).toHaveBeenCalledWith({
      email: mockUser.email,
      password: mockHashedPassword,
    });
    expect(mockSave).toHaveBeenCalled();
    expect(user).toEqual({ ...mockUser, password: mockHashedPassword });
  });

  test("should login an existing user", async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const token = await loginUser(mockUser.email, "password123");

    expect(UserModel.findOne).toHaveBeenCalledWith({ email: mockUser.email });
    expect(bcrypt.compare).toHaveBeenCalledWith(
      "password123",
      mockUser.password
    );
    expect(token).toBeTruthy();
  });

  test("should not register a user with an already existing email", async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);

    await expect(registerUser(mockUser.email, "password123")).rejects.toThrow(
      ERROR_MESSAGES.USER_ALREADY_EXISTS
    );

    expect(UserModel.findOne).toHaveBeenCalledWith({ email: mockUser.email });
    expect(UserModel).not.toHaveBeenCalled();
  });

  test("should not register a user with an invalid email or password", async () => {
    await expect(registerUser("invalid-email", "password123")).rejects.toThrow(
      ValidationError
    );

    await expect(registerUser(mockUser.email, "short")).rejects.toThrow(
      ValidationError
    );
  });

  test("should not login if password does not match", async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(loginUser(mockUser.email, "wrongpassword")).rejects.toThrow(
      ERROR_MESSAGES.INVALID_EMAIL_OR_PASSWORD
    );

    expect(UserModel.findOne).toHaveBeenCalledWith({ email: mockUser.email });
    expect(bcrypt.compare).toHaveBeenCalledWith(
      "wrongpassword",
      mockUser.password
    );
  });

  test("should not login if password is not hashed", async () => {
    const unHashedUser = { ...mockUser, password: "unhashedpassword" };
    (UserModel.findOne as jest.Mock).mockResolvedValue(unHashedUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(loginUser(mockUser.email, "unhashedpassword")).rejects.toThrow(
      ERROR_MESSAGES.INVALID_EMAIL_OR_PASSWORD
    );

    expect(UserModel.findOne).toHaveBeenCalledWith({ email: mockUser.email });
    expect(bcrypt.compare).toHaveBeenCalledWith(
      "unhashedpassword",
      unHashedUser.password
    );
  });
});
