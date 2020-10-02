import * as actionTypes from './actionTypes';
import { useQuery, gql } from '@apollo/client';

export function addScore(score: IScore) {
  const action: ScoreAction = {
    type: actionTypes.ADD_SCORE,
    score,
  };

  return simulateHttpRequest(action);
}

export function simulateHttpRequest(action: ScoreAction) {
  // This is where we call GraphQL api to mutate data. Separate out to file of the component
  return (dispatch: DispatchType) => {
    dispatch(action);
  };
}
