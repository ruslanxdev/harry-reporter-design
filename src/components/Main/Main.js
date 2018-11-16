import React, { Component } from 'react';
import { TestBox } from '../TestBox/TestBox';

import './Main.css';

import data from '../../data';

class Main extends Component {
  render() {
    return (
      <div className="Main">
        {data.tests.map((test, i) => <TestBox key={i} {...test} />)}
      </div>
    );
  }
}

export { Main };
