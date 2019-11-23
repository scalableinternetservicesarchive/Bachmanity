import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { observer } from "mobx-react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import FeedView from "./views/feed_view";
import LobbyView from "./views/lobby_view";
import LoginView from "./views/login_view";
import CreateLobbyView from "./views/create_lobby_view";
import model from "./model";
import state from "./model/state";

export default observer(
  class App extends React.Component {
    componentDidMount() {
      model.user.updateCurrentUser();
    }

    render() {
      if (!state.user) {
        if (window.location.href.indexOf("/signup") === -1) {
          return <LoginView mode={"login"} />;
        } else {
          return <LoginView mode={"signup"} />;
        }
      }

      return (
        <Router>
          <div className="App">
            <Switch>
              <Route path="/lobbies" component={FeedView} />
              <Route path="/lobby/:id" component={LobbyView} />
              <Route path="/create-lobby" component={CreateLobbyView} />
              <Route path="/">
                <FeedView />
              </Route>
            </Switch>
          </div>
        </Router>
      );
    }
  }
);
