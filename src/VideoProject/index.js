import React, { Component } from 'react';
import ProgressBar from './ProgressBar/index';
import LayoutPreview from './LayoutPreview/index';
import mediaList from './mediaDataset';

export default class WallVideoEditor extends Component {
  state = {
    progress: 0, // video progress
    nowMediaIndex: 0,
    isPlay: true,
    ShouldChangeVideoProgress: false,
  }
  onClickProgressItem = ({ nowMediaIndex, progress }) => {
    this.setState({ nowMediaIndex, progress });
  }
  onUpdateProgress = ({ progress }) => {
    this.setState({ progress });
  }
  onEnd = () => {
    const { nowMediaIndex } = this.state;
    if (nowMediaIndex < (mediaList.length - 1)) {
      this.setState({ nowMediaIndex: nowMediaIndex + 1, progress: 0 });
    }
  }
  onChangePlayStatus = ({ isPlay }) => {
    this.setState({ isPlay });
  }
  render() {
    const { progress, nowMediaIndex, isPlay } = this.state;
    return (
      <div>
        <LayoutPreview
          nowMediaIndex={nowMediaIndex}
          mediaList={mediaList}
          progress={progress}
          onUpdateProgress={this.onUpdateProgress}
          onEnd={this.onEnd}
          isPlay={isPlay} />
        <button type="button" onClick={() => { this.onChangePlayStatus({ isPlay: true }); }}>play</button>
        <button type="button" onClick={() => { this.onChangePlayStatus({ isPlay: false }); }}>pause</button>
        <ProgressBar
          nowMediaIndex={nowMediaIndex}
          mediaList={mediaList}
          progress={progress}
          onClickBar={this.onClickProgressItem} />
      </div>
    );
  }
}
