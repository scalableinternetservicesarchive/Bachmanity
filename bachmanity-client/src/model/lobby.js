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
  },

  getNewMessages: async (lobbyId, lastMessageId = null) => {
    if (!lastMessageId)
      lastMessageId = 0;
    
    const res = await axios.get(config.backend + "/lobbies/" + lobbyId + "/lobby_messages/new_messages/" + lastMessageId)
    return res.data;
  }
}