import { User } from "@/models/UserModel";

const getLocalAccessToken = (): string | null =>
  localStorage.getItem("accessToken");

const getLocalRefreshToken = (): string | null =>
  localStorage.getItem("refreshToken");

const setLocalAccessToken = (token: string): void => {
  localStorage.setItem("accessToken", token);
};

const setLocalRefreshToken = (token: string): void => {
  localStorage.setItem("refreshToken", token);
};

const getUser = (): User | null => {
  const userString = localStorage.getItem("user");
  return userString ? JSON.parse(userString) : null;
};

const setUser = (user: User): void => {
  localStorage.setItem("user", JSON.stringify(user));
};

const removeUser = (): void => {
  localStorage.removeItem("user");
};

export const AuthHelper = {
  getLocalRefreshToken,
  getLocalAccessToken,
  setLocalAccessToken,
  setLocalRefreshToken,
  getUser,
  setUser,
  removeUser,
};
