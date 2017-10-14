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

const BLOCKED_TILE = () => {
  return {
    blocked: true,
    dead: false
  };
};

const START_TILE = () => {
  return {
    blocked: false,
    start: true,
    dead: false
  };
};

const END_TILE = () => {
  return {
    blocked: false,
    end: true,
    dead: false
  };
};

const ADJACENCY_TYPES = [
  [0,-1],
  [0,1],
  [1,0],
  [-1,0]
];

const last = function(ary){
  return ary[ary.length - 1];
};

//A* considers both heuristic and cost
const aStarSort = function(list1, list2){
  let value1 = last(list1)[0] + last(list1)[1] - list1.length;
  let value2 = last(list2)[0] + last(list2)[1] - list2.length;
  //if(value1 > value2){return -1;}
  //if(value2 > value1){return 1;}
  if(list1.length > list2.length){return 1;}//Ties broken in favor of breadth
  if(list2.length > list1.length){return -1;}//Ties broken in favor of breadth
  return 0;
};

//Greedy only considers heuristic and ignores cost.
const greedySort = function(list1, list2){
  let value1 = last(list1)[0] + last(list1)[1];
  let value2 = last(list2)[0] + last(list2)[1];
  if(value1 > value2){return -1;}
  if(value2 > value1){return 1;}
  return 0;
};

class App extends Component {

  constructor(){
    super();
    this.state = {
      searchType: "DFS",
      gridSize: [16, 32],
      activated: false,
      boardState: [[]],
      searchEdge: [[[0,0]]]
    };
    this.generateBoard = this.generateBoard.bind(this);
    this.randomize = this.randomize.bind(this);
    this.solve = this.solve.bind(this);
    this.solveSlow = this.solveSlow.bind(this);
    this.solveFast = this.solveFast.bind(this);
    this.searchStep = this.searchStep.bind(this);
    this.pickType = this.pickType.bind(this);
    this.toggleBlock = this.toggleBlock.bind(this);
    setTimeout(this.randomize,0);//Ensure that all other pending actions have been completed before we randomize.
  }

  toggleBlock(event){
    console.log(event.target);
    console.log(event.target.id);
    let coords = event.target.id.split(",");
    let board = this.state.boardState;
    let prev = board[coords[0]][coords[1]].blocked;
    if(prev){
      board[coords[0]][coords[1]].blocked = false;
    }else{
      board[coords[0]][coords[1]].blocked = true;
    }
    this.setState({boardState: board});
  }

  pickType(event){
    this.setState({searchType: event.target.value});
  }

  solveSlow(){
    this.solve(600);
  }

  solveFast(){
    this.solve(30);
  }

  solve(time){
    if (this.state.activated === true) return;
    this.setState({activated: true});
    this.interval = setInterval(this.searchStep, time);
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
    if (border.length === 0){
      clearInterval(this.interval);
      alert("Maze is impossible!");
      return;
    }

    let boardState = this.state.boardState;
    let el;
    if(this.state.searchType === "DFS"){
      el = border.pop();
    } else {
      el = border.shift();
    }
    boardState[last(el)[0]][last(el)[1]].dead = true;
    for (let i = 0; i < ADJACENCY_TYPES.length; i++) {
      let adj = ADJACENCY_TYPES[i];
      adj = [last(el)[0]+adj[0],last(el)[1]+adj[1]];
      if (this.validTile(adj, boardState)){
        boardState[adj[0]][adj[1]].border = true;
        border.push(el.concat([adj]));
        if (boardState[adj[0]][adj[1]].end === true){
          for (let j = 0; j < el.length; j++) {
            boardState[el[j][0]][el[j][1]].solution = true;
          }
          boardState[adj[0]][adj[1]].solution = true;
          clearInterval(this.interval);
          this.setState({searchEdge: border, boardState: boardState});
          setTimeout( ()=>{alert("Maze is solved!");} , 100);
          return;
        }
      }
    }
    if(this.state.searchType === "A*") {border = border.sort(aStarSort);}
    if (this.state.searchType === "Greedy") {border = border.sort(greedySort);}
    this.setState({searchEdge: border, boardState: boardState});
  }

  randomize() {
    clearInterval(this.interval);
    this.setState({
      activated: false,
      boardState: this.generateBoard('random'),
      searchEdge: [[[0,0]]]
    });
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
          if ((parseInt(Math.random() * 4) < 1) && (i > 1 || j > 1)) {
            ary[i][j] = BLOCKED_TILE();
          } else {
            ary[i][j] = DEFAULT_TILE();
          }
        }
      }
    }
    ary[0][0] = START_TILE();
    ary[size[0] - 1][size[1] - 1] = END_TILE();
    return ary;
  }

  render() {
    let list = this.state.searchEdge;
    let out = [];
    for (let i = 0; i < list.length; i++) {
      out[i] = " "+last(list[i])[0]+"-"+last(list[i])[1];
      if (i < list.length -1){out[i]+=",";}
    }
    return (
      <div className="App">
        <Grid gridSize={this.state.gridSize}
          boardState={this.state.boardState}
          toggleBlock={this.toggleBlock}/>
        <Controls
          pickType={this.pickType}
          type={this.state.searchType}
          randomize={this.randomize}
          solveFast={this.solveFast}
          solveSlow={this.solveSlow}/>
        <p>{out}</p>
      </div>
    );
  }
}

export default App;
