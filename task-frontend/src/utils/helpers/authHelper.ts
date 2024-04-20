import { DataConstants } from "../constants/dataConstants";
import { SwalHelper } from "./swalHelper";

const getAccessToken = () => {
  const authentication = JSON.parse(localStorage.getItem("authentication")!);
  return authentication ? authentication.tokens?.accessToken : null;
};

const getRefreshToken = () => {
  const authentication = JSON.parse(localStorage.getItem("authentication")!);
  return authentication ? authentication.tokens?.refreshToken : null;
};

const setTokens = (accessToken: string, refreshToken: string) => {
  try {
    const authenticationJSON = localStorage.getItem("authentication");

    const authenticationData = JSON.parse(authenticationJSON!);

    authenticationData.tokens.accessToken = accessToken;
    authenticationData.tokens.refreshToken = refreshToken;

    localStorage.setItem("authentication", JSON.stringify(authenticationData));
  } catch (error) {
    SwalHelper.MiniAlert("Có lỗi xảy ra!", "error");
  }
};

const removeAuthenticaton = () => {
  localStorage.removeItem("authentication");
};

const getUser = () => {
  const authentication = JSON.parse(localStorage.getItem("authentication")!);
  return authentication ? authentication.user : null;
};

const setAuthenticaton = (tokens: any, user: any) => {
  try {
    const data = {
      tokens: tokens,
      user: user,
    };
    const dataJSON = JSON.stringify(data);
    localStorage.setItem("authentication", dataJSON);
  } catch (error) {
    SwalHelper.MiniAlert("Có lỗi xảy ra!", "error");
  }
};
const isCandidate = () => {
  const currentUser = getUser();
  return currentUser && currentUser.role === DataConstants.ROLE_DATA.CANDIDATE;
};

const isEmployer = () => {
  const currentUser = getUser();
  return currentUser && currentUser.role === DataConstants.ROLE_DATA.EMPLOYER;
};

const isAdmin = () => {
  const currentUser = getUser();
  return currentUser && currentUser.role === DataConstants.ROLE_DATA.ADMIN;
};
const isHR = () => {
  const currentUser = getUser();
  return currentUser && currentUser.role === DataConstants.ROLE_DATA.HR;
};

export const AuthHelper = {
  getRefreshToken,
  getAccessToken,
  setTokens,
  removeAuthenticaton,
  setAuthenticaton,
  getUser,
  isCandidate,
  isEmployer,
  isAdmin,
  isHR,
};
