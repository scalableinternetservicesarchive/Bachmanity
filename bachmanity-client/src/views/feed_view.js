import React from "react";
import { observer } from "mobx-react";
import model from "../model";
import LobbyListItem from "../components/lobby_list_item";
import "./feed_view.css";

import { Link } from "react-router-dom";

export default observer(
  class FeedView extends React.Component {
    componentDidMount() {
      model.lobby.refreshAll();
    }

    render() {
      const lobbyList =
        model.state.lobbies &&
        model.state.lobbies.map(lobby => {
          return (
            <div className="LobbyItemWrapper">
              <Link to={"/lobby/" + lobby.id}>
                <LobbyListItem
                  key={lobby.id}
                  lobbyTitle={lobby.title}
                  lobbyDesc={lobby.desc}
                  videoId={lobby.currentVideoId}
                />
              </Link>
            </div>
          );
        });

      return (
        <div className="FeedView">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#">
              Bachmanity
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarText"
              aria-controls="navbarText"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/create-lobby">
                    Create Lobby
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          <div className="LobbyList">{lobbyList}</div>
        </div>
      );
    }
  }
);
