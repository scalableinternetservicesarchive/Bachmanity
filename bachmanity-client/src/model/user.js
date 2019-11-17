import axios from "axios";
import config from "../config";
import state from "./state";
import { assertPropertyConfigurable } from "mobx/lib/internal";

export default {
    updateCurrentUser: async () => {
        const res = await axios.get(config.backend + "/loggedin");
        state.user = res.data;
        return state.user;
    },

    login: async () => {
        const body = {
            name: this.state.username,
            password: this.state.password,

        }

        const res = await axios.post(config.backend + "/login", body, {
            headers: {
                'Content-Type': 'application/json',
            }
        })

        return res.data;

    }
}