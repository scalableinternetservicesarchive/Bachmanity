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

  // depricated in favor of getNewVideos for partial sync
  getQueue: async lobbyId => {
    // localhost:3000/api/lobbies/1/queued_videos/
    const res = await axios.get(config.backend + "/lobbies/" + lobbyId + "/queued_videos/");
    return res.data;
  },

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
  },

  getNewVideos: async (lobbyId, lastVideoId) => {
    const route =
      config.backend + "/lobbies/" + lobbyId + "/queued_videos/new_videos/" + lastVideoId;
    console.log("hitting route: " + route);
    const res = await axios.get(route);
    console.log("getNewVideos res: ", res.data);
    return res.data;
  },

  postNewVideo: async (lobbyId, videoId) => {
    await axios.post(config.backend + "/lobbies/" + lobbyId + "/queued_videos", {
      queued_video: {
        user_id: state.user.id,
        video: videoId
      }
    });
  }
};
