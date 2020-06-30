import React, { Component } from 'react';
import Hero from '../Hero';
import Upload from '../Upload';

export class Main extends Component {
  render() {
    return (
      <div>
        <Hero />
        <Upload />
      </div>
    );
  }
}

export default Main;
