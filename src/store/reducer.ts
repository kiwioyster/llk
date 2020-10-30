import * as actionTypes from './actionTypes';
const initialGrid: ICell[][] = new Array(12).fill(new Array(16).fill({}));
const initialState: GameState = {
  scores: [],
  grid: initialGrid.map((row, x) => {
    return row.map((col, y) => {
      return {
        coord: { x, y },
        content:
          x === 0 ||
          x === initialGrid.length - 1 ||
          y === 0 ||
          y === row.length - 1
            ? undefined
            : 'tile',
      };
    });
  }),
};

const reducer = (
  state: GameState = initialState,
  action: GameAction
): GameState => {
  if (action.type === actionTypes.ADD_SCORE && action.score) {
    return { ...state, scores: state.scores.concat([action.score]) };
  } else if (action.type === actionTypes.REMOVE_TILE && action.coords?.length) {
    action.coords.forEach((coord) => {
      const { x, y } = coord;
      state.grid[x][y].content = undefined;
    });
    const newGrid = [...state.grid];
    return { ...state, grid: newGrid };
  }

  return state;
};

export default reducer;
