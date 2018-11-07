import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Cell from './Cell';
import ScoresModel from './../data/models/Scores';

import range from 'lodash/range';
import classnames from 'classnames';

class Row extends Component {
  static propTypes = {
    row: PropTypes.string.isRequired,
    cellStartIndex: PropTypes.number.isRequired,
    hiddenCells: PropTypes.array.isRequired,
    bonusCells: PropTypes.array.isRequired,
    updateScore: PropTypes.func.isRequired,
    scores: PropTypes.instanceOf(ScoresModel).isRequired,
  };

  updateScore = column => () => {
    return this.props.updateScore(column);
  };

  render() {
    return (
      <div className={ classnames('row', this.props.row) }>
        { range(this.props.cellStartIndex, this.props.cellStartIndex + 10).map(column => <Cell
          row={ this.props.row }
          column={ column }
          hidden={ this.props.hiddenCells.includes(column)}
          bonus={ this.props.bonusCells.includes(column)}
          key={`${this.props.row}-${column}`}
          updateScore={ this.updateScore(column) }
          value={ this.props.scores.getRow(this.props.row).get(column) }
        />) }
      </div>
    )
  }
}

export default Row
