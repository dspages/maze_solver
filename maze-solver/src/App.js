import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Grid from './components/Grid';
import Controls from './components/Controls';

const DEFAULT_TILE = ()=>{
  return {
    blocked: false,
    dead: false
  };
};

const BLOCKED_TILE = {
  blocked: true,
  dead: false
};

const START_TILE = {
  blocked: false,
  start: true,
  dead: false
};

const END_TILE = {
  blocked: false,
  end: true,
  dead: false
};

const ADJACENCY_TYPES = [
  [0,-1],
  [0,1],
  [1,0],
  [-1,0]
];

class App extends Component {

  constructor(){
    super();
    this.state = {
      searchType: "DFS",
      gridSize: [24, 24],
      activated: false,
      boardState: [[]],
      searchEdge: [[0,0]]
    };
    this.generateBoard = this.generateBoard.bind(this);
    this.randomize = this.randomize.bind(this);
    this.solve = this.solve.bind(this);
    this.searchStep = this.searchStep.bind(this);
  }

  solve(){
    //if (this.state.activated === true) return;
    this.setState({activated: true});
    setInterval(this.searchStep, 200);
  }

  validTile(tile, boardState){
    if(tile[0] < 0 || tile[0] >= this.state.gridSize[0]){ return false; }
    if(tile[1] < 0 || tile[1] >= this.state.gridSize[1]){ return false; }
    let targetTile = boardState[tile[0]][tile[1]];
    if(targetTile.dead || targetTile.blocked || targetTile.border){ return false; }
    return true;
  }

  searchStep(){
    let border = this.state.searchEdge;
    let boardState = this.state.boardState;
    let el;
    if(this.state.searchType === "DFS"){
      el = border.pop();
    } else {
      el = border.shift();
    }
    boardState[el[0]][el[1]].dead = true;
    for (let i = 0; i < ADJACENCY_TYPES.length; i++) {
      let adj = ADJACENCY_TYPES[i];
      adj = [el[0]+adj[0],el[1]+adj[1]];
      if (this.validTile(adj, boardState)){
        border.push(adj);
        boardState[adj[0]][adj[1]].border = true;
      }
    }
    this.setState({searchEdge: border, boardState: boardState});
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
          ary[i][j] = DEFAULT_TILE();
        } else {
          if ((parseInt(Math.random() * 3) === 1) && (i > 1 || j > 1)) {
            ary[i][j] = BLOCKED_TILE;
          } else {
            ary[i][j] = DEFAULT_TILE();
          }
        }
      }
    }
    ary[0][0] = START_TILE;
    ary[size[0] - 1][size[1] - 1] = END_TILE;
    return ary;
  }

  render() {
    return (
      <div className="App">
        <Grid gridSize={this.state.gridSize} boardState={this.state.boardState} />
        <Controls randomize={this.randomize} solve={this.solve} />
      </div>
    );
  }
}

export default App;
