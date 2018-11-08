import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Row from './../components/Row';
import ScoresModel from './../data/models/Scores';

import classnames from 'classnames';

class Scores extends Component {

  static propTypes = {
    scores: PropTypes.instanceOf(ScoresModel),
    scoreId: PropTypes.string.isRequired,
    updateScore: PropTypes.func.isRequired,
    diceRoll: PropTypes.number,
    activeDice: PropTypes.array,
  };

  updateScore = row => column => {
    if (!this.props.scores.isAvailable(row, column, this.props.diceRoll)) {
      return;
    }

    if (!this.props.activeDice.includes(row)) {
      return;
    }

    return this.props.updateScore(this.props.scores.set('values', this.props.scores.values.setIn([row, column], this.props.diceRoll)));
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
          scores={ this.props.scores }
        /><br/>
        <Row
          row="yellow"
          cellStartIndex={ 1 }
          hiddenCells={ [6] }
          bonusCells={ [8] }
          updateScore={ this.updateScore('yellow')}
          scores={ this.props.scores }
        /><br/>
        <Row
          row="purple"
          cellStartIndex={ 0 }
          hiddenCells={ [4] }
          bonusCells={ [2, 9] }
          updateScore={ this.updateScore('purple')}
          scores={ this.props.scores }
        /><br/>


        <div>
          <h2>Final Score:</h2>
          <div className="score-totals-container">
            { ScoresModel.ROW_COLORS.map(color => <div key={ color } className={ classnames('row-score', color) }>{ this.props.scores.calculateRowScore(color) }</div>) }
            <div className="operator">+</div>
            { this.props.scores.getBonusScores().map((bonusScore, index) => <div key={ index } className="bonus-score">{ bonusScore }</div>)}
            <div className="operator">-</div>
            <div className="row-score">{ this.props.scores.getPenaltyScore() }</div>
            <div className="operator">=</div>
            <div className="row-score">{ this.props.scores.calculateTotalScore() }</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Scores