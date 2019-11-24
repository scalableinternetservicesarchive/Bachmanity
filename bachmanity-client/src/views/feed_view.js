import React from "react";
import { observer } from "mobx-react";
import model from "../model";
import LobbyListItem from "../components/lobby_list_item";
import "./feed_view.css";
import accountLogout from "./account-logout.svg";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import nightBg from "./img/Home@2x.png";

export default observer(
  class FeedView extends React.Component {
    state = {
      showModal: false
    };
    componentDidMount() {
      model.lobby.refreshAll();
    }

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

    open() {
      this.setState({ showModal: true });
    }

    close() {
      this.setState({ showModal: false });
    }
    render() {
      const lobbyList =
        model.state.lobbies &&
        model.state.lobbies.map(lobby => {
          return (
            <div className="LobbyItemWrapper" key={lobby.id}>
              <Link to={"/lobby/" + lobby.id}>
                <LobbyListItem
                  lobbyTitle={lobby.title}
                  lobbyDesc={lobby.desc}
                  videoId={lobby.currentvideoid}
                />
              </Link>
            </div>
          );
        });

      return (
        <div className="FeedView">
          <nav className="navbar sticky-top navbar-expand-lg navbar-light  shadow-sm bg-white">
            <a className="navbar-brand" href="/">
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
              <ul className="navbar-nav mr-auto"></ul>
              <span className="navbar-text">
                <a className="nav-link" onClick={this.open.bind(this)}>
                  <div style={{ margin: "0px 0px -10px 10px" }}>
                    <i className="material-icons">playlist_add</i>
                  </div>
                  Lobby
                </a>
              </span>
              <span className="navbar-text">
                <a
                  className="nav-link"
                  onClick={() => {
                    model.user.logout();
                  }}
                >
                  <div style={{ margin: "0px 0px -5px 10px" }}>
                    <i class="material-icons"> exit_to_app</i>
                  </div>
                  Logout
                </a>
              </span>
            </div>
          </nav>
          <h3 class="font-weight-light text-center mt-4 mb-0">Your Feed</h3>

          <hr class="my-4" />
          <div
            className="row text-center text-lg-left"
            style={{ margin: "0px 0px 20px 100px" }}
          >
            {lobbyList}
          </div>
          {/* <div className="LobbyList">{lobbyList}</div> */}
          <div>
            <Modal
              className="feed-modal-container"
              show={this.state.showModal}
              onHide={this.close.bind(this)}
              animation={true}
              scrollable={true}
              keyboard={true}
            >
              <Modal.Header closeButton>
                <Modal.Title>Create New Lobby</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <div className="messageBox">
                  <form onSubmit={this.onSubmit.bind(this)}>
                    <span>Title:</span>
                    <input
                      name="title"
                      type="text"
                      className="form-control"
                      onChange={this.onChange.bind(this, "title")}
                      value={this.state.title}
                    ></input>
                    <br />
                    <span>Description:</span>
                    <input
                      name="description"
                      type="text"
                      className="form-control"
                      onChange={this.onChange.bind(this, "desc")}
                      value={this.state.desc}
                    ></input>
                    <br />
                    <span>Video URL:</span>
                    <input
                      name="description"
                      type="text"
                      className="form-control"
                      onChange={this.onChange.bind(this, "currentVideoId")}
                      value={this.state.currentVideoId}
                    ></input>
                    <br />
                    <input
                      type="submit"
                      className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
                    />
                  </form>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      );
    }
  }
);
