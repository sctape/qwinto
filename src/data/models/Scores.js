import { Record, Map } from 'immutable';

export class Scores extends Record({
  id: null,
  values: new Map(),
}) {
  getRow(row) {
    return this.values.get(row, new Map())
  }
  getColumnValues(column) {
    return Scores.COLORS.map(color => this.getRow(color).get(column));
  }
  isAvailable(newRow, newColumn, newValue) {
    //Check for unique values in column
    if (this.getColumnValues(newColumn).includes(newValue)) {
      return false;
    }

    //If first entry in row, must be ok
    const row = this.getRow(newRow);
    if (row.size === 0) {
      return true;
    }

    //Check that value is greater than all values that come before it in row, and less than all values that come after
    return row.every((value, column) => {
      if (value > 0 && column === newColumn) {
        return false;
      }

      return (newColumn < column && newValue < value) || (newColumn > column && newValue > value)
    });
  }
}

Scores.COLORS = ['orange', 'yellow', 'purple'];

export default Scores
