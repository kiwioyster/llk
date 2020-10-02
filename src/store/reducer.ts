import * as actionTypes from './actionTypes';

const initialState: ScoreState = {
  scores: [
    {
      name: 'post 1',
      seconds: 123,
    },
  ],
};

const reducer = (
  state: ScoreState = initialState,
  action: ScoreAction
): ScoreState => {
  if (action.type === actionTypes.ADD_SCORE) {
    return { ...state, scores: state.scores.concat([action.score]) };
  }
  return state;
};

export default reducer;
