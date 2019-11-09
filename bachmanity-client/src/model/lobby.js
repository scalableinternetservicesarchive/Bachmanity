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
  },

  //new method
  // load a lobby, make request to web server, get cur video
  getInfo: async (id) => {
    const res = await axios.get(config.backend + "/lobbies/"+id);
    return res.data;
  }
}