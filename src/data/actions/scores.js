import { UPDATE_SCORE } from './../action-types';

export function scoreUpdateSuccess(score) {
  return {
    type: UPDATE_SCORE,
    score,
  }
}

export function updateScore(score) {
  return (dispatch) => {
    dispatch(scoreUpdateSuccess(score));
  };
}