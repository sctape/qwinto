import { Record, Map } from 'immutable';

export class Scores extends Record({
  id: null,
  values: new Map(),
  penalties: 0,
}) {
  getRow(row) {
    return this.values.get(row, new Map());
  };

  getColumnValues(column) {
    return Scores.ROW_COLORS.map(color => this.getRow(color).get(column, null));
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
  };

  calculateRowScore(row) {
    const filteredRow = this.getRow(row).filter(value => value !== null);

    if (filteredRow.size === Scores.POSSIBLE_ROW_VALUES) {
      return filteredRow.sort().last();
    }

    return filteredRow.size;
  };

  getRowScores() {
    return Scores.ROW_COLORS.map(color => this.calculateRowScore(color));
  }

  calculateBonusScore(row, column) {
    const columnValues = this.getColumnValues(column);

    if (columnValues.includes(null)) {
      return 0;
    }

    return this.values.getIn([row, column]);
  };

  getBonusScores() {
    return Scores.BONUS.map(bonusCoordinates => this.calculateBonusScore(bonusCoordinates[0], bonusCoordinates[1]))
  }

  getPenaltyScore() {
    return this.penalties * Scores.PENALTY;
  }

  calculateTotalScore() {
    let totalScore = 0;

    totalScore += this.getRowScores().reduce((sum, rowScore) => sum + rowScore, 0);
    totalScore += this.getBonusScores().reduce((sum, bonusScore) => sum + bonusScore, 0);
    totalScore -= this.getPenaltyScore();

    return totalScore
  };
}

Scores.ROW_COLORS = ['orange', 'yellow', 'purple'];
Scores.POSSIBLE_ROW_VALUES = 9;
Scores.BONUS = [['purple', 2], ['orange', 3], ['orange', 7], ['yellow', 8], ['purple', 9]];
Scores.PENALTY = 5;

export default Scores
