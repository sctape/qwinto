import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Row from './../components/Row';
import ScoresModel from './../data/models/Scores';

class Scores extends Component {

  static propTypes = {
    scores: PropTypes.instanceOf(ScoresModel),
    scoreId: PropTypes.string.isRequired,
    updateScore: PropTypes.func.isRequired,
  };

  updateScore = row => (column, value) => {
    return this.props.updateScore(this.props.scores.set('values', this.props.scores.values.setIn([row, column], value)));
  };

  render() {
    return (
      <div className="scores">
        <Row
          row="orange"
          cellStartIndex={ 2 }
          hiddenCells={ [5] }
          bonusCells={ [3, 7] }
          updateScore={ this.updateScore('orange')}
          scores={ this.props.scores.getRow('orange') }
        /><br/>
        <Row
          row="yellow"
          cellStartIndex={ 1 }
          hiddenCells={ [6] }
          bonusCells={ [8] }
          updateScore={ this.updateScore('yellow')}
          scores={ this.props.scores.getRow('yellow') }
        /><br/>
        <Row
          row="purple"
          cellStartIndex={ 0 }
          hiddenCells={ [4] }
          bonusCells={ [2, 9] }
          updateScore={ this.updateScore('purple')}
          scores={ this.props.scores.getRow('purple') }
        /><br/>
      </div>
    )
  }
}

export default Scores