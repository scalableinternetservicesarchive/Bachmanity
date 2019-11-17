import lobby from "./lobby";
import state from "./state";
import user from "./user";
import axios from "axios";

axios.defaults.withCredentials = true

export default {
  lobby,
  state,
  user
}