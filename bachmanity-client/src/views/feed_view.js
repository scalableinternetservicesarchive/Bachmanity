import React from 'react';
import { observer } from "mobx-react"
import model from "../model";

export default observer(class FeedView extends React.Component {

  componentDidMount() {
    model.lobby.refreshAll();
  }

  render() {
    const lobbyList = model.state.lobbies && model.state.lobbies.map((lobby) => {
      return (
        <li key={lobby.id}>
          {lobby.id}: {lobby.title}
        </li>
      );
    });
  
    return (
      <div>
        <h1>Feed View</h1>
        <ul>{lobbyList}</ul>
      </div>
    );
  }
})
  