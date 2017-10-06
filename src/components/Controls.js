import React, { Component } from 'react';

function Controls(props) {
  return (
    <div className="control__panel">
      <button onClick={props.randomize}> Reset </button>
        <div>
          <select onChange={props.pickType} value={props.type}>
            <option value="DFS">DFS - Stack - Dynamic Array</option>
            <option value="BFS">BFS - Queue - Ring Buffer</option>
            <option value="A*">A* - Priority Queue - Heap</option>
          </select>
        </div>
      <button onClick={props.solveFast}> Start (fast)! </button>
      <button onClick={props.solveSlow}> Start (slow)! </button>
    </div>
  );
}

export default Controls;
