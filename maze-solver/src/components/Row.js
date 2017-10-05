import React, { Component } from 'react';
import Tile from './Tile';

class Row extends Component {

  constructor(props){
    super(props);
  }

  render(){
    let j = 0;
    let tiles = [];
    while (j < this.props.gridSize[1]){
      tiles.push(<Tile displayProps={this.props.tiles[j]} />);
      j++;
    }
    return(
      <div>{tiles}</div>
    );
  }

}

export default Row;
