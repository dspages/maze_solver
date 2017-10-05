import React, { Component } from 'react';
import Tile from './Tile';

function Row(props) {
    let j = 0;
    let tiles = [];

    while (j < props.gridSize){
      tiles.push(<Tile displayProps={props.tiles[j]} />);
      j++;
    }
    
    return(
      <div className="row">{tiles}</div>
    );
}

export default Row;
