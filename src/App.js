import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Grid from './components/Grid';
import Controls from './components/Controls';
import {
  DEFAULT_TILE,
  START_TILE,
  END_TILE,
  BLOCKED_TILE,
  ADJACENCY_TYPES,
  DEFAULT_APP_STATE} from '../util/consts';
import { aStarSortComparison, greedySortComparison } from '../util/comparisons';
import { last } from '../util/misc_helpers';




class App extends Component {

  constructor(){
    super();
    this.state = DEFAULT_APP_STATE;
    this.generateBoard = this.generateBoard.bind(this);
    this.randomize = this.randomize.bind(this);
    this.solve = this.solve.bind(this);
    this.solveSlow = this.solveSlow.bind(this);
    this.solveFast = this.solveFast.bind(this);
    this.searchStep = this.searchStep.bind(this);
    this.pickType = this.pickType.bind(this);
    this.toggleBlock = this.toggleBlock.bind(this);
    this.checkIfSolved = this.checkIfSolved.bind(this);
    setTimeout(this.randomize,0);//Ensure that all other pending actions have been completed before we randomize.
  }

  toggleBlock(event){
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

  checkIfSolved(el, adj, border, boardState){
    if (boardState[adj[0]][adj[1]].end === true){
      for (let j = 0; j < el.length; j++) {
        boardState[el[j][0]][el[j][1]].solution = true;
      }
      boardState[adj[0]][adj[1]].solution = true;
      clearInterval(this.interval);
      this.setState({searchEdge: border, boardState: boardState});
      setTimeout( ()=>{alert("Maze is solved!");} , 100);
      return true;
    }
    return false;
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
        if(this.checkIfSolved(el, adj, border, boardState)) {return;}
      }
    }
    if(this.state.searchType === "A*") {border = border.sort(aStarSortComparison);}
    if (this.state.searchType === "Greedy") {border = border.sort(greedySortComparison);}
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

    //This loop creates a list of the current leaf nodes of the search tree
    //so the user can observe the abstract data type the algorithm is using
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
