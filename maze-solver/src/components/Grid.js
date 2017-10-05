import React, { Component } from 'react';
import Row from './Row';

const DEFAULT_TILE = {
  blocked: false
};

class Grid extends Component {

  constructor(props){
    super(props);
    let size = props.gridSize;
    let ary = new Array(size[0]);
    for (let i = 0; i < ary.length; i++) {
      ary[i] = new Array(size[1]);
      for (let j = 0; j < ary[i].length; j++) {
        ary[i][j] = DEFAULT_TILE;
      }
    }
    this.state = {master: ary};
    console.log(this.state);
  }

  render(){
    let i = 0;
    let rows = [];
    while (i < this.props.gridSize[0]){
      rows.push(<Row gridSize={this.props.gridSize} tiles={this.state.master[i]}/>);
      i++;
    }

    return(
      <div>
        {rows}
      </div>
    );
  }
}

export default Grid;
