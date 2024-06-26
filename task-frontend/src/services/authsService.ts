import axiosConfig from "@/configs/axiosConfig";
import { AuthAPI } from "@/Apis";

const authsService = {
  async signin(email: string, password: string, role: string) {
    const userData = {
      username: email.trim(),
      password: password.trim(),
      role: role.trim(),
    };
    console.log(userData);
    return await axiosConfig.post(AuthAPI.signin, userData, {
      headers: { "Content-Type": "application/json" },
    });
  },
  async signupCandiDate(
    firstName: string,
    lastName: string,
    dob: Date,
    sex: string,
    email: string,
    password: string
  ) {
    const userData = {
      username: email.trim(),
      password: password.trim(),
      dateOfBirth: dob,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      sex: sex.trim(),
    };
    return await axiosConfig.post(AuthAPI.signupCandidate, userData, {
      headers: { "Content-Type": "application/json" },
    });
  },
  async verifyCandidate(email: string, token: string) {
    const userData = {
      email: email.trim(),
      token: token.trim(),
    };
    return await axiosConfig.post(AuthAPI.verifyCandidate, userData, {
      headers: { "Content-Type": "application/json" },
    });
  },
  async verifyEmployer(email: string, token: string) {
    const userData = {
      email: email.trim(),
      token: token.trim(),
    };
    return await axiosConfig.post(AuthAPI.verifyEmployer, userData, {
      headers: { "Content-Type": "application/json" },
    });
  },
  async signupEmployer(
    username: string,
    password: string,
    name: string,
    location: string,
    description: string,
    phoneNumber: string,
    businessCode: string
  ) {
    const userData = {
      username: username.trim(),
      password: password.trim(),
      name: name.trim(),
      location: location.trim(),
      description: description.trim(),
      phoneNumber: phoneNumber.trim(),
      businessCode: businessCode.trim(),
    };
    return await axiosConfig.post(AuthAPI.signupEmployer, userData, {
      headers: { "Content-Type": "application/json" },
    });
  },

  async signout() {
    return await axiosConfig.get(AuthAPI.logout, {
      headers: { "Content-Type": "application/json" },
    });
  },
  async changePassword(currentPassword: string, newPassword: string) {
    const body = {
      currentPassword: currentPassword.trim(),
      newPassword: newPassword.trim(),
    };
    return await axiosConfig.patch(AuthAPI.changePassword, body, {
      headers: { "Content-Type": "application/json" },
    });
  },
  async resetPassword(password: string, token: string) {
    const userData = {
      password: password.trim(),
    };
    return await axiosConfig.post(AuthAPI.resetPassword, userData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  async forgotPassword(email: string) {
    return await axiosConfig.get(AuthAPI.forgotPassword(email));
  },
};
export default authsService;
