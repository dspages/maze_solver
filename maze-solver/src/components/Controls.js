import React, { Component } from 'react';

function Controls(props) {
  return (
    <div className="control__panel">
      <button onClick={props.randomize}> Randomize </button>
      <button> Search Type </button>
      <button> Start! </button>
    </div>
  );
}

export default Controls;
