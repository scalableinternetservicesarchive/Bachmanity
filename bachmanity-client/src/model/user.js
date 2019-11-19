import axios from "axios";
import config from "../config";
import state from "./state";

export default {
  updateCurrentUser: async () => {
    const res = await axios.get(config.backend + "/loggedin", {
      crossDomain: true,
      withCredentials: true
    });
    state.user = res.data;
    return state.user;
  },

  login: async (username, password) => {
    const body = {
      name: username,
      password: password
    };

    const res = await axios.post(config.backend + "/login", body, {
      withCredentials: true,
      crossDomain: true,
      headers: {
        "Content-Type": "application/json"
      }
    });

    return res.data;
  },

  signup: async (username, password) => {
    const body = {
      user: {
        name: username,
        password: password
      }
    };

    const res = await axios.post(config.backend + "/signup", body, {
      withCredentials: true,
      crossDomain: true,
      headers: {
        "Content-Type": "application/json"
      }
    });

    return res.data;
  }
};
