import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Grid from './components/Grid';
import Controls from './components/Controls';

const DEFAULT_TILE = {
  blocked: false
};

const BLOCKED_TILE = {
  blocked: true
};

class App extends Component {

  constructor(){
    super();
    this.state = {
      searchType: "DFS",
      gridSize: [30, 30],
      activated: false,
      boardState: [[]]
    };
    this.generateBoard = this.generateBoard.bind(this);
    this.randomize = this.randomize.bind(this);
  }

  randomize() {
    this.setState({boardState: this.generateBoard('random') });
  }

  generateBoard(type) {
    let size = this.state.gridSize;
    let ary = new Array(size[0]);
    for (let i = 0; i < ary.length; i++) {
      ary[i] = new Array(size[1]);
      for (let j = 0; j < ary[i].length; j++) {
        if (type === 'clear') {
          ary[i][j] = DEFAULT_TILE;
        } else {
          if (parseInt(Math.random() * 3) === 1) {
            ary[i][j] = BLOCKED_TILE;
          } else {
            ary[i][j] = DEFAULT_TILE;
          }
        }
      }
    }
    return ary;
  }

  render() {
    console.log(this.state.boardState);
    return (
      <div className="App">
        <Grid gridSize={this.state.gridSize} boardState={this.state.boardState} />
        <Controls randomize={this.randomize} />
      </div>
    );
  }
}

export default App;
