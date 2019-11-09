import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

import FeedView from "./views/feed_view";
import LobbyView from "./views/lobby_view";
import VideoPlayer from "./components/video_player";
import LoginView from "./views/login_view";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/users" component={LoginView} />
          <Route path="/lobby/:id" component={LobbyView} />
          <Route path="/testVideo" component={VideoPlayer} />
          <Route path="/">
            <FeedView />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
