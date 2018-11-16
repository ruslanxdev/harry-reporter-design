import React, { Component } from 'react';
import { BaseStyles } from '@primer/components';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';

import "primer/index.scss";

class App extends Component {
  render() {
    return (
      <BaseStyles className="App">
        <Header/>
        <Main />
      </BaseStyles>
    );
  }
}

export default App;
