import React, { Component } from 'react';
import Row from './Row';

class Grid extends Component {

  constructor(props){
    super(props);
  }

  render(){
    let i = 0;
    let rows = [];
    while (i < this.props.boardState.length) {
      rows.push(<Row gridSize={this.props.boardState[i].length} tiles={this.props.boardState[i]}/>);
      i++;
    }

    return(
      <div className="grid">
        {rows}
      </div>
    );
  }
}

export default Grid;
