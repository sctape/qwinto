import React, { Component } from 'react';

import Scores from './containers/Scores';

import { Map } from 'immutable';

import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Scores scores={ new Map() }/>
      </div>
    );
  }
}

export default App;
