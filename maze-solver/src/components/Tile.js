import React, { Component } from 'react';

class Tile extends Component {

  constructor(props){
    super(props);
    this.state = props.displayProps;
  }

  render(){
    return(
      <div className={`blocked--${this.state.blocked}`}> Hi </div>
    );
  }
}

export default Tile;
