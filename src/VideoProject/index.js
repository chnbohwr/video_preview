import React, { Component } from 'react';
import ProgressBar from './ProgressBar/ProgressBar';
import data from './testdata';

export default class Main extends Component {
  render() {
    return (
      <div>
        <ProgressBar videos={data} />
      </div>
    );
  }
}
