import lobby from "./lobby";
import state from "./state";
import user from "./user";
import axios from "axios";

axios.defaults.withCredentials = true;

export default {
  lobby,
  state,
  user,

  // youtube_url_parser function from: https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
  youtube_url_parser: url => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  }
};
