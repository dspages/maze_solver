export const DEFAULT_TILE = ()=>{
  return {
    blocked: false,
    dead: false
  };
};

export const BLOCKED_TILE = () => {
  return {
    blocked: true,
    dead: false
  };
};

export const START_TILE = () => {
  return {
    blocked: false,
    start: true,
    dead: false
  };
};

export const END_TILE = () => {
  return {
    blocked: false,
    end: true,
    dead: false
  };
};

export const ADJACENCY_TYPES = [
  [0,-1],
  [0,1],
  [1,0],
  [-1,0]
];

export const DEFAULT_APP_STATE = {
  searchType: "DFS",
  gridSize: [16, 32],
  activated: false,
  boardState: [[]],
  searchEdge: [[[0,0]]]
};
