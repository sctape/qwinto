import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Cell from './Cell';

import range from 'lodash/range';
import classnames from 'classnames';

class Row extends Component {
  static propTypes = {
    row: PropTypes.string.isRequired,
    cellStartIndex: PropTypes.number.isRequired,
    hiddenCells: PropTypes.array.isRequired,
    bonusCells: PropTypes.array.isRequired,
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
        />) }
      </div>
    )
  }
}

export default Row
