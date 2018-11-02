import { UPDATE_SCORE } from './../action-types';
import EntityState from './../EntityState';

export default function (state = new EntityState(), action) {
  switch (action.type) {
    case UPDATE_SCORE: {
      return state.setIn(['items', action.score.id], action.score)
    }

    default:
      return state;
  }
}
