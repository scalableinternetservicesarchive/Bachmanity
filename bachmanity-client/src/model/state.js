import {observable} from "mobx";

export default observable({
  lobbies: null,
  curLobby: null,
  user: {
    id: 1,
  }
});