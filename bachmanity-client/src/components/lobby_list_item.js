import React from 'react';
import {Container, Row, Col} from 'react-bootstrap'
import VideoThumbnail from '../components/video_thumbnail';
import './lobby_list_item.css'

export default class LobbyListItem extends React.Component {

  render() {
    return (
      <div>
          <Container>
            <Col className="LobbyItem">
              <Row>
                {this.props.lobbyTitle}
              </Row>
              <Row>
                {this.props.lobbyDesc}
              </Row>
              <Row className="VideoThumbnail">
                <VideoThumbnail
                  className="VideoThumbnail"
                  videoId={this.props.videoId}
                />
              </Row>
            </Col>
          </Container>
      </div>
    )
  }
};