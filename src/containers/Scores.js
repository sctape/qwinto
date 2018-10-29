import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Row from './../components/Row';

import { Map } from 'immutable';

class Scores extends Component {

  static propTypes = {
    scores: PropTypes.instanceOf(Map).isRequired,
  };

  render() {
    return (
      <div className="scores">
        <Row row="orange" cellStartIndex={ 2 } hiddenCells={ [5] } bonusCells={ [3, 7] } /><br/>
        <Row row="yellow" cellStartIndex={ 1 } hiddenCells={ [6] } bonusCells={ [8] } /><br/>
        <Row row="purple" cellStartIndex={ 0 } hiddenCells={ [4] } bonusCells={ [2, 9] } /><br/>
      </div>
    )
  }
}

export default Scores