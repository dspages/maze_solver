# React Maze Solver

This is a maze solver built in React by Daniel Pages and Justin Austria.

## Live site link

[Click here to try it out!][live]

[live]: https://react-maze-solver.herokuapp.com/

## Features

It can randomly generate mazes.

It can then solve them using breadth-first-search, depth-first-search, or A* search.

## Instructions
First, choose a type of search algorithm.
Second, click solve (normal), or solve (slow).
Third, you can click reset to start again.

Slow solving delays the processing of the maze so you can better observe and understand how the algorithm is working.

## Search Types

### DFS
Depth first search requires the simplest abstract data type (a stack), which would be powered by a dynamic array as the underlying data structure. Depth first search does guarantee a solution if one exists, but does not guarantee an -optimal- solution.

[Depth First Search][dfs]

[dfs]: https://en.wikipedia.org/wiki/Depth-first_search

[Stacks][stack]

[stack]: https://en.wikipedia.org/wiki/Stack_(abstract_data_type)

[Dynamic Arrays][dyn_arr]

[dyn_arr]: https://en.wikipedia.org/wiki/Dynamic_array

### BFS
The second option is breadth first search. Breadth first search uses a queue as its abstract data type, which would be implemented with a ring buffer as the data structure. Breadth first search does guarantee an optimal solution if one exists, but it can also be slower than the other search types.

[Breadth First Search][bfs]

[bfs]: https://en.wikipedia.org/wiki/Breadth-first_search

[Queue][q]

[q]: https://en.wikipedia.org/wiki/Queue_(abstract_data_type)

[Ring Buffer][RB]

[RB]: https://en.wikipedia.org/wiki/Circular_buffer

### Greedy
The third option is the greedy search. This uses a priority queue as its abstract data type, which could be implemented with a heap as its data structure. Greedy search is usually the fastest type of search to find a solution for this particular problem, but it may not be the optimal solution. Furthermore, Greedy searches require a heuristic to estimate the value of a given search node - in this app, it is easy to calculate the distance from the goal to estimate the value of the target, but a good and easily computable heuristic may not be available in all cases.

[Greedy][greed]

[greed]: https://en.wikipedia.org/wiki/Greedy_algorithm

[Priority Queue][PQ]

[PQ]: https://en.wikipedia.org/wiki/Priority_queue

[Heap][heap]

[heap]: https://en.wikipedia.org/wiki/Heap_(data_structure)

### A*
The final option is an A* search. Like Greedy Search, A* uses a priority queue as its abstract data type, which could be implemented with a heap as its data structure. A* search guarantees an optimal solution if one exists, and explores more efficiently than Breadth First Search. Like a greedy search, A* requires a heuristic, and the heuristic must be "admissible" if the A* is to guarantee an optimal solution. Read more below to understand admissibility and A* searches.

[A* Search][astar]

[astar]: https://en.wikipedia.org/wiki/A*_search_algorithm

## Planned Features

- At present, the abstract data types (ring buffer and priority queue) are implemented sub-optimally in the code. When time permits, we will replace them with the correct data structures.

- Users should be able to custom-define their mazes by changing the dimensions and by clicking on tiles to toggle them blocked or not.

- We plan to perform additional styling to make the website itself more visually appealing, and additional refactoring to make the JavaScript code more modular and readable.
