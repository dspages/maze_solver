import React, { Component } from 'react';
import Tile from './Tile';

function Row(props) {
    let j = 0;
    let tiles = [];

    while (j < props.gridSize){
      tiles.push(<Tile
        key={j}
        displayProps={props.tiles[j]}
        toggleBlock={props.toggleBlock}
        xCoord={props.xCoord}
        yCoord={j}/>);
      j++;
    }

    return(
      <div className="row">{tiles}</div>
    );
}

export default Row;
