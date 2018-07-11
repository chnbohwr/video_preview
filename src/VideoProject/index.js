import React, { Component } from 'react';
import produce from 'immer';
import ProgressBar from './ProgressBar/ProgressBar';
import WallPreview from './WallPreview/WallPreview';
import ImgPlayer from './ImgPlayer';
import mediaDataSet from './mediaDataset';
import canvasDataSet from './canvasDataset';

const MEDIA_TYPE = {
  IMAGE: "i",
  VIDEO: "v"
};

export default class WallVideoEditor extends Component {
  state = {
    progress: 0, // video progress
    nowMediaIndex: 0,
    isPlay: false,
    mediaList: mediaDataSet,
    canvasList: canvasDataSet,
    wallDataset: mediaDataSet.map((d, i) => ({ position: { x: 0, y: 0 }, ratio: 1, id: i, })),
    layoutRatio: 1,
  }

  playerList = this.state.mediaList.map(mediaData => (
    mediaData.type === MEDIA_TYPE.VIDEO
      ? React.createRef()
      : { current: new ImgPlayer(mediaData.length) }
  ))

  onDragProgressBar = ({ nowMediaIndex, progress }) => {
    this.setState({ nowMediaIndex, progress }, this.videoControl);
  }

  onPlay = ({ currentTime }) => {
    this.setState({ progress: currentTime });
  }

  onEnd = () => {
    const { nowMediaIndex, mediaList } = this.state;
    if (nowMediaIndex < (mediaList.length - 1)) {
      this.setState({ nowMediaIndex: nowMediaIndex + 1, progress: 0 }, this.videoControl);
    }
  }

  onChangePlayStatus = ({ isPlay }) => {
    this.setState({ isPlay }, this.videoControl);
  }

  onChangeLayout = ({ id, position, ratio }) => {
    const wallDataset = produce(this.state.wallDataset, (dataset) => {
      dataset[id] = { id, position, ratio };
    });
    this.setState({ wallDataset });
  }

  onLayoutZoom = ({ ratio }) => {
    let newRatio = this.state.layoutRatio + ratio;
    if (newRatio > 2) { newRatio = 2; }
    if (newRatio < 0.25) { newRatio = 0.25; }
    this.setState({ layoutRatio: newRatio });
  }

  videoControl = () => {
    const { nowMediaIndex } = this.state;
    const nowVideoPlayer = this.playerList[nowMediaIndex].current;
    this.playerList.forEach((p) => {
      const player = p.current;
      player.pause();
      player.currentTime = 0;
      player.onended = () => { };
      player.ontimeupdate = () => { };
    });
    nowVideoPlayer.currentTime = this.state.progress;
    if (this.state.isPlay) {
      nowVideoPlayer.play();
      nowVideoPlayer.ontimeupdate = this.onPlay.bind(this, nowVideoPlayer);
      nowVideoPlayer.onended = this.onEnd;
    }
  }
  onChangeMediaSort = ({ mediaList, filterIndex, targetIndex }) => {
    this.playerList.forEach((p) => {
      const player = p.current;
      player.pause();
      player.currentTime = 0;
    });
    const temp = this.playerList.splice(filterIndex, 1);
    this.playerList.splice(targetIndex, 0, temp[0]);
    this.setState({
      mediaList, progress: 0, nowMediaIndex: 0, isPlay: false,
    });
  }

  render() {
    const {
      playerList,
      state: {
        progress, nowMediaIndex, layoutRatio,
        mediaList, canvasList, wallDataset,
      }
    } = this;
    return (
      <div>
        <WallPreview
          mediaList={mediaList}
          canvasList={canvasList}
          nowMediaIndex={nowMediaIndex}
          wallDataset={wallDataset}
          onChangeLayout={this.onChangeLayout}
          playerList={playerList}
          layoutRatio={layoutRatio}
        />
        <button type="button" onClick={() => { this.onLayoutZoom({ ratio: 0.25 }); }}>zoom in</button>
        <button type="button" onClick={() => { this.onLayoutZoom({ ratio: -0.25 }); }}>zoom out</button>

        <button type="button" onClick={() => { this.onChangePlayStatus({ isPlay: true }); }}>play</button>
        <button type="button" onClick={() => { this.onChangePlayStatus({ isPlay: false }); }}>pause</button>
        <ProgressBar
          nowMediaIndex={nowMediaIndex}
          mediaList={mediaList}
          progress={progress}
          onChangeMediaSort={this.onChangeMediaSort}
          onDragProgressBar={this.onDragProgressBar} />
      </div>
    );
  }
}
