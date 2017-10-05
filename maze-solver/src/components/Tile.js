import React, { Component } from 'react';

function Tile(props) {
  return(
    <div className={`tile blocked--${props.displayProps.blocked}`}> </div>
  );
}

export default Tile;
