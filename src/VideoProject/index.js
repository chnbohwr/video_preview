import React, { Component } from 'react';
import ProgressBar from './ProgressBar/ProgressBar';
import data from './testdata';

export default class WallVideoEditor extends Component {
  state = {
    progress: 0, // video progress
  }
  render() {
    const { progress } = this.state;
    return (
      <div>
        <ProgressBar mediaList={data} progress={progress} />
      </div>
    );
  }
}
