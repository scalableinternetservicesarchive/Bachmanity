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

  createLobby: async (title, desc, videoId) => {
    const res = await axios.post(config.backend + "/lobbies", {
      title: title,
      desc: desc,
      currentVideoId: videoId
    });

    if (state.lobbies) state.lobbies.push(res.data);
    else state.lobbies = [res.data];

    return res.data;
  },

  //new method
  // load a lobby, make request to web server, get cur video
  getInfo: async id => {
    const res = await axios.get(config.backend + "/lobbies/" + id);
    return res.data;
  },

  getQueue: async lobbyId => {
    // localhost:3000/api/lobbies/1/queued_videos/
    const res = await axios.get(config.backend + "/lobbies/" + lobbyId + "/queued_videos/");
    return res.data;
  },

  // addToQueue: async (lobbyId, videoId) => {
  //   const res = await axios.post(config.backend + "")
  // }

  getNewMessages: async (lobbyId, lastMessageId = null) => {
    if (!lastMessageId) lastMessageId = 0;

    const res = await axios.get(
      config.backend + "/lobbies/" + lobbyId + "/lobby_messages/new_messages/" + lastMessageId
    );
    return res.data;
  },

  postMessage: async (lobbyId, message) => {
    await axios.post(config.backend + "/lobbies/" + lobbyId + "/lobby_messages", {
      lobby_message: {
        user_id: state.user.id,
        message: message
      }
    });
  }
};
