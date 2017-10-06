#React Maze Solver

This is a maze solver built in React by Daniel Pages and Justin Austria.

## Live site link

[Click here to try it out!][live]

[live]: https://react-maze-solver.herokuapp.com/

## Features

It can randomly generate mazes.

It can then solve them using breadth-first-search, depth-first-search, or A* search.

## Instructions
First, choose a type of search algorithm.
Second, click solve (fast), or solve (slow). Fast solving is faster, but slow solving lets you watch more closely how the algorithm is actually exploring the maze.
Third, you can click reset to start again.

## Search Types

### DFS
Depth first search requires the simplest abstract data type (a stack), which would be powered by a dynamic array as the underlying data structure. Depth first search does not guarantee an optimal solution.

### BFS
The second option is breadth first search. Breadth first search uses a queue as its abstract data type, which would be implemented with a ring buffer as the data structure. Breadth first search does guarantee an optimal solution, but it can also be slower than the other search types.

### A*
The third option is an A* search. A* uses a priority queue as its abstract data type, which would be implemented with a heap as its data structure. A* search guarantees an optimal solution and explores more efficiently than Breadth First Search.
