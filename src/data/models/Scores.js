import { Record, Map } from 'immutable';

export class Scores extends Record({
  id: null,
  values: new Map(),
}) {
  getRow(row) {
    return this.values.get(row, new Map())
  }
}

export default Scores
