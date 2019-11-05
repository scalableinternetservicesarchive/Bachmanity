import React from 'react';
export default (props) => {
  const params = props.match.params;
  return (
    <h1>LobbyView for Lobby {params.id}</h1>
  )
}