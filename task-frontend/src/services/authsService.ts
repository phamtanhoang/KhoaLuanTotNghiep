import axiosConfig from "@/configs/axiosConfig";
import { AuthAPI } from "@/configs/helper";

const authsService = {
  async signin(email: string, password: string) {
    const userData = {
      username: email.trim(),
      password: password.trim(),
    };
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
      firstname: firstName.trim(),
      lastName: lastName.trim(),
      sex: sex.trim(),
      // phoneNumber: "",
    };
    return await axiosConfig.post(AuthAPI.signupCandidate, userData, {
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
};
export default authsService;
