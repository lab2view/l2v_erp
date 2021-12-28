import axios from "../config/axios";
import { getVerifyEmailRoute } from "../helpers/utils";

export default {
  login(credentials) {
    return axios.post("/auth/login", credentials);
  },

  logout() {
    return axios.get("/auth/logout");
  },

  register(credentials) {
    return axios.post("/auth/register", {
      ...credentials,
      verify_link: getVerifyEmailRoute(),
    });
  },
};
