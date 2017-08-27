import React, { Component } from 'react';

import Northward from './Northward';
import Southward from './Southward';

import './App.css';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      position: 0
    };
  }

  _click () {
    this.setState(prevState => {
      const currPos = this.state.position;
      const nextPos = currPos + 1;
      if (nextPos <= window.innerHeight) {
        return { position: nextPos };
      }
    });
  }

  render () {
    console.log('this.state', this.state);
    return (
      <div className='App' onClick={this._click.bind(this)}>
        <div>
          <Northward position={this.state.position} />
          <Southward position={20} />
        </div>
        <p className='App-intro'>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
