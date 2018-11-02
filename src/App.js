import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import Scores from './containers/Scores';
import ScoresModel from './data/models/Scores';
import { updateScore } from './data/actions/scores';

import './App.css';

class App extends Component {
  static propTypes = {
    scores: PropTypes.instanceOf(ScoresModel),
    scoreId: PropTypes.string.isRequired,
    updateScore: PropTypes.func.isRequired,
  };

  static defaultProps = {
    scoreId: 'abc123',
  };

  render() {
    return (
      <div>
        <Scores scores={ this.props.scores || new ScoresModel({id: 'abc123'}) } scoreId={ this.props.scoreId } updateScore={ this.props.updateScore } />
      </div>
    );
  }
}

export default connect(
  state => ({
    scores: state.scores.items.get('abc123'),
  }),
  dispatch => bindActionCreators({
    updateScore,
  }, dispatch)
)(App);
