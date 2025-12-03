import axios from "axios";
import type { UserView } from "../../modules/users/models/UserView";

const BASE_URL = import.meta.env.VITE_EXPRESS_URL;

export const userAPI = {
  register: (user: UserView) =>
    axios.post(`${BASE_URL}/api/users/register`, user),

  login: (user: UserView) =>
    axios.post(`${BASE_URL}/api/users/login`, user),

  getUserInfo: () =>
    axios.get(`${BASE_URL}/api/users/me`)
};
