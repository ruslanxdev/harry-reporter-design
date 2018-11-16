import React, { Component } from 'react';
import { Heading, Text } from '@primer/components';

import './Header.css';

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <Heading>Harry report</Heading>
        <Text mr={3}><Text fontWeight="bold">Total Tests</Text>: 8714</Text>
        <Text mr={3} color="green.5"><Text fontWeight="bold">Passed</Text>: 8714</Text>
        <Text mr={3} color="red.5"><Text fontWeight="bold">Failed</Text>: 15</Text>
        <Text mr={3} color="gray.5"><Text fontWeight="bold">Skipped</Text>: 252</Text>
        <Text mr={3} color="yellow.6"><Text fontWeight="bold">Retries</Text>: 455</Text>
      </div>
    );
  }
}

export { Header };
