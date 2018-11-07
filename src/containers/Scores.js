import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Row from './../components/Row';
import Die from './../components/Die';
import ScoresModel from './../data/models/Scores';

class Scores extends Component {

  state = {
    orangeDie: 1,
    yellowDie: 1,
    purpleDie: 1,
    total: 3,
    orangeDisabled: false,
    yellowDisabled: false,
    purpleDisabled: false,
    rolling: null,
  };

  static propTypes = {
    scores: PropTypes.instanceOf(ScoresModel),
    scoreId: PropTypes.string.isRequired,
    updateScore: PropTypes.func.isRequired,
  };

  updateScore = row => column => {
    if (!this.props.scores.isAvailable(row, column, this.state.total)) {
      return;
    }

    if (this.state[`${row}Disabled`]) {
      return;
    }

    return this.props.updateScore(this.props.scores.set('values', this.props.scores.values.setIn([row, column], this.state.total)));
  };

  rollDice = () => {
    this.setState({ rolling: true});

    const rollingDice = setInterval(() => {
      const state = {};

      if (!this.state.orangeDisabled) {
        state.orangeDie =  Math.floor(Math.random() * 6) + 1;
        state.total += state.orangeDie;
      }

      if (!this.state.yellowDisabled) {
        state.yellowDie =  Math.floor(Math.random() * 6) + 1;
        state.total += state.yellowDie;
      }

      if (!this.state.purpleDisabled) {
        state.purpleDie =  Math.floor(Math.random() * 6) + 1;
        state.total += state.purpleDie;
      }

      this.setState(state);
    }, 200);

    setTimeout(() => {
      clearInterval(rollingDice);
      this.setState(prevState => ({
        rolling: null,
        total: prevState.orangeDie + prevState.yellowDie + prevState.purpleDie,
      }));
    }, 1250);

  };

  toggleDie = color => () => {
    return this.setState(prevState => ({
      [`${color}Disabled`]: !prevState[`${color}Disabled`],
    }))
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
          <Die pips={ this.state.orangeDie } disabled={ this.state.orangeDisabled } color="orange" onClick={ this.toggleDie('orange') } />
          <Die pips={ this.state.yellowDie } disabled={ this.state.yellowDisabled } color="yellow" onClick={ this.toggleDie('yellow') } />
          <Die pips={ this.state.purpleDie } disabled={ this.state.purpleDisabled } color="purple" onClick={ this.toggleDie('purple') } />
          { !this.state.rolling && this.state.total }
        </div>
        <div>
          <button onClick={ this.rollDice } disabled={ this.state.rolling }>
            { !this.state.rolling ? 'Roll!' : 'Rolling!' }
          </button>
        </div>
      </div>
    )
  }
}

export default Scores