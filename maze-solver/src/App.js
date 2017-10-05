import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Grid from './components/Grid';

class App extends Component {

  constructor(){
    super();
    this.state = {
      searchType: "DFS",
      gridSize: [4, 4],
      activated: false
    };
  }

  render() {
    return (
      <div className="App">
        <Grid gridSize={this.state.gridSize}></Grid>
      </div>
    );
  }
}

export default App;
