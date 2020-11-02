import * as actionTypes from './actionTypes';

export function addScore(score: IScore) {
  const action: GameAction = {
    type: actionTypes.ADD_SCORE,
    score,
  };

  return (dispatch: DispatchType) => {
    dispatch(action);
  };
}

export function removeTiles(coords: ICoord[]) {
  const action: GameAction = {
    type: actionTypes.REMOVE_TILE,
    coords,
  };

  return (dispatch: DispatchType) => {
    dispatch(action);
  };
}

export function highlightTiles(coords: ICoord[]) {
  const action: GameAction = {
    type: actionTypes.HIGHLIGHT_TILE,
    coords,
  };

  return (dispatch: DispatchType) => {
    dispatch(action);
  };
}

export function simulateHttpRequest(action: GameAction) {
  // This is where we call GraphQL api to mutate data. Separate out to file of the component
  return (dispatch: DispatchType) => {
    dispatch(action);
  };
}
