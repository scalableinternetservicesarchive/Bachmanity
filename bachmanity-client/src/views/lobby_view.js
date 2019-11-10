import React from 'react';
import { observer } from "mobx-react";
import model from "../model";
import VideoPlayer from "../components/video_player";
import MessageBox from "../components/message_box";

export default observer(class LobbyView extends React.Component {
  state={}
  componentDidMount() {
    model.lobby.getInfo(this.props.match.params.id)
      .then((lobbyInfo) => {
        this.setState({
          lobbyInfo:lobbyInfo
        })
      })
      .catch(err => {
        alert("Failed to load lobby"+err);
      })
  }

  render() {

    if(!this.state.lobbyInfo){
      return <h1>Loading...</h1>
    }
    return (
      <div>
        <h1>Lobby View</h1>
        <VideoPlayer videoId={this.state.lobbyInfo.currentVideoId}/>
        <MessageBox lobbyId={this.props.match.params.id} />
      </div>
    );
  }
})