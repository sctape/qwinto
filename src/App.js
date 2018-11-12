import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import Scores from './containers/Scores';
import Die from './components/Die';
import ScoresModel from './data/models/Scores';
import { updateScore } from './data/actions/scores';
import User from './data/models/User';

import './App.scss';

class App extends Component {

  state = {
    orangeDie: 1,
    yellowDie: 1,
    purpleDie: 1,
    total: null,
    orangeActive: true,
    yellowActive: true,
    purpleActive: true,
    rolling: false,
    rollCount: 0,
    players: [new User({scoreId: 'abc123', name: 'Sam'}), new User({scoreId: 'def456', name: 'Jess'}) ],
    activePlayer: 0,
    secondaryTurn: false,
  };

  static propTypes = {
    scores: PropTypes.instanceOf(ScoresModel),
    updateScore: PropTypes.func.isRequired,
  };

  rollDice = () => {
    this.setState( prevState => ({ rolling: true, rollCount: prevState.rollCount + 1 }));

    const rollingDice = setInterval(() => {
      const state = {};

      if (this.state.orangeActive) {
        state.orangeDie =  Math.floor(Math.random() * 6) + 1;
      }

      if (this.state.yellowActive) {
        state.yellowDie =  Math.floor(Math.random() * 6) + 1;
      }

      if (this.state.purpleActive) {
        state.purpleDie =  Math.floor(Math.random() * 6) + 1;
      }

      this.setState(state);
    }, 100);

    setTimeout(() => {
      clearInterval(rollingDice);
      this.setState(prevState => ({
        rolling: null,
        total: (prevState.orangeDie * prevState.orangeActive) + (prevState.yellowDie * prevState.yellowActive) + (prevState.purpleDie * prevState.purpleActive),
      }));
    }, 600);
  };

  toggleDie = color => () => {
    return this.setState(prevState => ({
      [`${color}Active`]: !prevState[`${color}Active`],
    }))
  };

  getActiveDice = () => {
    const activeDice = [];
    if (this.state.orangeActive) {
      activeDice.push('orange');
    }

    if (this.state.yellowActive) {
      activeDice.push('yellow');
    }

    if (this.state.purpleActive) {
      activeDice.push('purple');
    }

    return activeDice;
  };

  advanceTurn = () => {
    if (this.state.secondaryTurn) {
      return this.setState(prevState => ({
        activePlayer: prevState.activePlayer + 2 === prevState.players.length ? 0 : prevState.activePlayer + 1,
        secondaryTurn: false,
      }));
    }

    return this.setState({ secondaryTurn: true });
  };

  render() {
    return (
      <div>
        { this.state.players.map((player, index) => <Scores
          user={ player }
          updateScore={ this.props.updateScore }
          scores={ this.props.scores.get(player.scoreId) || new ScoresModel({id: player.scoreId}) }
          diceRoll={ this.state.total }
          activeDice={ this.getActiveDice() }
          activePlayer={ index === this.state.activePlayer || (this.state.secondaryTurn && index !== this.state.activePlayer) }
          disabled={ index !== this.state.activePlayer || this.state.secondaryTurn }
          onScoreSubmit={ this.advanceTurn }
        />) }
        <div>
          <Die pips={ this.state.orangeDie } disabled={ !this.state.orangeActive } color="orange" onClick={ this.toggleDie('orange') } />
          <Die pips={ this.state.yellowDie } disabled={ !this.state.yellowActive } color="yellow" onClick={ this.toggleDie('yellow') } />
          <Die pips={ this.state.purpleDie } disabled={ !this.state.purpleActive } color="purple" onClick={ this.toggleDie('purple') } />
          { !this.state.rolling && this.state.total }
        </div>
        <div>
          <button onClick={ this.rollDice } disabled={ this.state.rolling || this.state.rollCount === 2 }>
            { !this.state.rolling ? 'Roll!' : 'Rolling!' }
          </button>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    scores: state.scores.items,
  }),
  dispatch => bindActionCreators({
    updateScore,
  }, dispatch)
)(App);
