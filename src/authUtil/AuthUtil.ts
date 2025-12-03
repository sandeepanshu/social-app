import axios from "axios";

export class AuthUtil {
  public static setTokenHeader(token: string | null) {
    if (token) {
      axios.defaults.headers.common["x-auth-token"] = token;
    } else {
      delete axios.defaults.headers.common["x-auth-token"];
    }
  }
}