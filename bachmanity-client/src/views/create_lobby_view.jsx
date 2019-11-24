import React from "react";
import { observer } from "mobx-react";
import model from "../model";
import "./create_lobby_view.css";

export default observer(
  class CreateLobbyView extends React.Component {
    state = {
      title: "",
      desc: "",
      currentVideoId: ""
    };

    onSubmit(event) {
      event.preventDefault();
      model.lobby
        .createLobby(
          this.state.title,
          this.state.desc,
          model.youtube_url_parser(this.state.currentVideoId)
        )
        .then(lobby => {
          alert("created your lobby! redirecting...");
          window.location.href = "/lobby/" + lobby.id;
        })
        .catch(e => {
          alert("Internal service error, failed to create lobby: " + e);
        });
      this.setState({ title: "", desc: "", currentVideoId: "" });
    }

    onChange(prop, event) {
      const state = Object.assign({}, this.state);
      state[prop] = event.target.value;
      this.setState(state);
    }

    render() {
      return (
        <div className="createlobbycontainer">
          <form onSubmit={this.onSubmit.bind(this)}>
            <h3>Create New Lobby</h3>
            <span>Title</span>
            <input
              name="title"
              type="text"
              onChange={this.onChange.bind(this, "title")}
              value={this.state.title}
            ></input>
            <br />
            <span>Description</span>
            <input
              name="description"
              type="text"
              onChange={this.onChange.bind(this, "desc")}
              value={this.state.desc}
            ></input>
            <br />
            <span>Video URL</span>
            <input
              name="description"
              type="text"
              onChange={this.onChange.bind(this, "currentVideoId")}
              value={this.state.currentVideoId}
            ></input>
            <br />
            <input type="submit" />
          </form>
        </div>
      );
    }
  }
);
