import React, { Component } from 'react';

function Tile(props) {
  return(
    <div className={`tile blocked--${props.displayProps.blocked}
                    start--${props.displayProps.start}
                    end--${props.displayProps.end}
                    dead--${props.displayProps.dead}
                    border--${props.displayProps.border}
                    solution--${props.displayProps.solution}`}
                    id={[props.xCoord, props.yCoord]}
                    onClick={props.toggleBlock}> </div>
  );
}

export default Tile;
