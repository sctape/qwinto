import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Row from './../components/Row';
import ScoresModel from './../data/models/Scores';
import User from './../data/models/User';

import classnames from 'classnames';
import range from 'lodash/range';

class Scores extends Component {

  state = {
    previousScore: null,
    currentScores: this.props.scores,
  };

  static propTypes = {
    scores: PropTypes.instanceOf(ScoresModel),
    user: PropTypes.instanceOf(User),
    updateScore: PropTypes.func.isRequired,
    diceRoll: PropTypes.number,
    activeDice: PropTypes.array,
    activePlayer: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    onScoreSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    activePlayer: false,
    disabled: false,
  };

  updateScore = row => column => {
    if (this.props.disabled) {
      return;
    }

    if (!this.props.scores.isAvailable(row, column, this.props.diceRoll)) {
      return;
    }

    if (!this.props.activeDice.includes(row)) {
      return;
    }

    let updatedValues = this.state.currentScores.values.setIn([row, column], this.props.diceRoll);
    let { currentScores } = this.state;

    if (this.state.previousScore === 'penalty') {
      currentScores = currentScores.set('penalties', currentScores.penalties - 1);
    } else if (this.state.previousScore) {
      updatedValues = updatedValues.deleteIn(this.state.previousScore);
    }

    this.setState({ previousScore: [row, column], currentScores: currentScores.set('values', updatedValues) });
  };

  submitScore = () => {
    this.props.updateScore(this.state.currentScores);
    return this.props.onScoreSubmit();
  };

  addPenalty = () => {
    let { currentScores } = this.state;

    if (currentScores.penalties > 3 || this.state.previousScore === 'penalty') {
      return;
    }

    if (this.state.previousScore) {
      currentScores = currentScores.set('values', currentScores.values.deleteIn(this.state.previousScore));
    }

    this.setState({ previousScore: 'penalty', currentScores: currentScores.set('penalties', currentScores.penalties + 1) });
  };

  renderPenalty = index => {
    const checked = this.state.currentScores.penalties > index;

    return <div className="penalty" key={ index } onClick={ this.addPenalty }>{ checked && 'x' }</div>
  };

  render() {
    return (
      <div className={ classnames('scores', { active: this.props.activePlayer }, { disabled: this.props.disabled })}>
        <button className="finish-turn" onClick={ this.submitScore }>Finished?</button>
        <h4> { this.props.user.name } </h4>
        <Row
          row="orange"
          cellStartIndex={ 2 }
          hiddenCells={ [5] }
          bonusCells={ [3, 7] }
          updateScore={ this.updateScore('orange')}
          scores={ this.state.currentScores }
        />
        <Row
          row="yellow"
          cellStartIndex={ 1 }
          hiddenCells={ [6] }
          bonusCells={ [8] }
          updateScore={ this.updateScore('yellow')}
          scores={ this.state.currentScores }
        />
        <Row
          row="purple"
          cellStartIndex={ 0 }
          hiddenCells={ [4] }
          bonusCells={ [2, 9] }
          updateScore={ this.updateScore('purple')}
          scores={ this.state.currentScores }
        />
        <div className="penalty-container">
          { range(4).map(index => this.renderPenalty(index)) }
        </div>
        <div className="scoring-section">
          <h4>Final Score:</h4>
          <div className="score-totals-container">
            { ScoresModel.ROW_COLORS.map(color => <div key={ color } className={ classnames('row-score', color) }>{ this.state.currentScores.calculateRowScore(color) }</div>) }
            <div className="operator">+</div>
            { this.state.currentScores.getBonusScores().map((bonusScore, index) => <div key={ index } className="bonus-score">{ bonusScore }</div>)}
            <div className="operator">-</div>
            <div className="row-score">{ this.state.currentScores.getPenaltyScore() }</div>
            <div className="operator">=</div>
            <div className="row-score">{ this.state.currentScores.calculateTotalScore() }</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Scores