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
    nowMediaId: 234,
    isPlay: false,
    mediaList: mediaDataSet,
    canvasList: canvasDataSet,
    wallDataset: mediaDataSet.reduce((dataset, mediaData) => { dataset[mediaData.id] = { position: { x: 0, y: 0 }, ratio: 1 }; return dataset; }, {}),
    layoutRatio: 1,
  }

  playerSet = this.state.mediaList.reduce((set, mediaData) => {
    if (mediaData.type === MEDIA_TYPE.VIDEO) {
      set[mediaData.id] = React.createRef();
    } else {
      set[mediaData.id] = { current: new ImgPlayer(mediaData.length) };
    }
    return set;
  }, {});

  onDragProgressBar = ({ nowMediaId, progress }) => {
    const player = this.playerSet[this.state.nowMediaId].current;
    player.pause();
    player.currentTime = 0;
    player.onended = () => { };
    player.ontimeupdate = () => { };
    this.setState({ nowMediaId, progress }, this.videoControl);
  }

  onPlay = ({ currentTime }) => {
    this.setState({ progress: currentTime });
  }

  onEnd = () => {
    const { nowMediaId, mediaList } = this.state;
    const mediaIndex = mediaList.findIndex(m => m.id === nowMediaId);
    if (mediaIndex < (mediaList.length - 1)) {
      this.setState({ nowMediaId: mediaList[mediaIndex + 1].id, progress: 0 }, this.videoControl);
    }
  }

  onChangePlayStatus = ({ isPlay }) => {
    this.setState({ isPlay }, this.videoControl);
  }

  onChangeLayout = ({ id, position, ratio }) => {
    const wallDataset = produce(this.state.wallDataset, (draft) => {
      const wallData = draft[id];
      wallData.position = position;
      wallData.ratio = ratio;
    });
    this.setState({ wallDataset });
  }

  onChangeMediaLength = ({id, deltaLength}) => {
    const mediaList = produce(this.state.mediaList, (draft) => {
      const media = draft.find(m => m.id === id);
      media.length += deltaLength;
    });
    this.setState({mediaList});
  }

  onLayoutZoom = ({ ratio }) => {
    let newRatio = this.state.layoutRatio + ratio;
    if (newRatio > 2) { newRatio = 2; }
    if (newRatio < 0.25) { newRatio = 0.25; }
    this.setState({ layoutRatio: newRatio });
  }

  videoControl = () => {
    const { nowMediaId } = this.state;
    const nowVideoPlayer = this.playerSet[nowMediaId].current;
    nowVideoPlayer.currentTime = this.state.progress;
    nowVideoPlayer.ontimeupdate = this.onPlay.bind(this, nowVideoPlayer);
    nowVideoPlayer.onended = this.onEnd;
    if (this.state.isPlay) {
      nowVideoPlayer.play();
    } else {
      nowVideoPlayer.pause();
    }
  }
  onChangeMediaSort = ({ mediaList }) => {
    this.setState({
      mediaList,
    }, () => {
      const { nowMediaId } = this.state;
      const nowVideoPlayer = this.playerSet[nowMediaId].current;
      if (this.state.isPlay) {
        nowVideoPlayer.play();
      } else {
        nowVideoPlayer.pause();
      }
    });
  }

  render() {
    const {
      playerSet,
      state: {
        progress, nowMediaId, layoutRatio,
        mediaList, canvasList, wallDataset,
      }
    } = this;
    return (
      <React.Fragment>
        <button type="button" onClick={() => { this.onLayoutZoom({ ratio: 0.25 }); }}>zoom in</button>
        <button type="button" onClick={() => { this.onLayoutZoom({ ratio: -0.25 }); }}>zoom out</button>

        <button type="button" onClick={() => { this.onChangePlayStatus({ isPlay: true }); }}>play</button>
        <button type="button" onClick={() => { this.onChangePlayStatus({ isPlay: false }); }}>pause</button>
        <WallPreview
          mediaList={mediaList}
          canvasList={canvasList}
          nowMediaId={nowMediaId}
          wallDataset={wallDataset}
          onChangeLayout={this.onChangeLayout}
          playerSet={playerSet}
          layoutRatio={layoutRatio}
        />
        <ProgressBar
          nowMediaId={nowMediaId}
          mediaList={mediaList}
          progress={progress}
          onChangeMediaSort={this.onChangeMediaSort}
          onDragProgressBar={this.onDragProgressBar}
          onChangeMediaLength={this.onChangeMediaLength} />
      </React.Fragment>
    );
  }
}
