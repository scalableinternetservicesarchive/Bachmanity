import React from 'react';
import { observer } from "mobx-react"
import model from "../model";
import LobbyListItem from '../components/lobby_list_item';
import './feed_view.css'


export default observer(class FeedView extends React.Component {

  componentDidMount() {
    model.lobby.refreshAll();
  }

  render() {
    const lobbyList = model.state.lobbies && model.state.lobbies.map((lobby) => {
      return (
        <LobbyListItem 
          key={lobby.id}
          lobbyTitle={lobby.title}
          lobbyDesc={lobby.desc}
          videoId={lobby.currentVideoId}
        />
      );
    });
  
    return (
      <div>
        <center><h1>Feed View</h1></center>
        <div className="LobbyList">
          {lobbyList}
        </div>
      </div>
    );
  }
})
  