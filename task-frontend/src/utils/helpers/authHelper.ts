import { User } from "@/models/UserModel";

const getAccessToken = () => {
  const tokens = JSON.parse(localStorage.getItem("tokens")!);
  return tokens ? tokens.accessToken : null;
};

const getRefreshToken = () => {
  const tokens = JSON.parse(localStorage.getItem("tokens")!);
  return tokens ? tokens.refreshToken : null;
};

const setTokens = (accessToken: string, refreshToken: string) => {
  const tokens = {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
  localStorage.setItem("tokens", JSON.stringify(tokens));
};

const removeTokens = () => {
  localStorage.removeItem("tokens");
};

// const getUser = (): User | null => {
//   const userString = localStorage.getItem("user");
//   return userString ? JSON.parse(userString) : null;
// };

// const setUser = (user: User): void => {
//   localStorage.setItem("user", JSON.stringify(user));
// };

// const removeUser = (): void => {
//   localStorage.removeItem("user");
// };

export const AuthHelper = {
  getRefreshToken,
  getAccessToken,
  setTokens,
  removeTokens,
};
