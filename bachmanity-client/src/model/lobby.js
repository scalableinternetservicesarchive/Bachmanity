import axios from "axios";
import config from "../config";
import state from "./state";

export default {
  refreshAll: async () => {
    const res = await axios.get(config.backend + "/lobbies");
    state.lobbies = res.data;
    return state.lobbies;
  },

  getAll: () => {
    return state.lobbies;
  }
}