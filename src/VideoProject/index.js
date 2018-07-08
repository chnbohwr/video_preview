import React, { Component } from 'react';
import ProgressBar from './ProgressBar/ProgressBar';
import VideoPreview from './VideoPreview/VideoPreview';
import CanvasPreview from './CanvasPreview/CanvasPreview';
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
    ShouldChangeVideoProgress: false,
    mediaList: mediaDataSet,
    canvasList: canvasDataSet,
  }

  playerList = this.state.mediaList.map((mediaData) =>
    (
      mediaData.type === MEDIA_TYPE.VIDEO
        ? React.createRef()
        : { current: new ImgPlayer(mediaData.length) }
    )
  )

  onClickProgressItem = ({ nowMediaIndex, progress }) => {
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
    const nowVideoPlayer = this.playerList[this.state.nowMediaIndex].current;
    console.log(nowVideoPlayer);
    this.setState({ isPlay }, this.videoControl);
  }

  videoControl = () => {
    const { nowMediaIndex, mediaList } = this.state;
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
      nowVideoPlayer.ontimeupdate = this.onPlay.bind(this, nowVideoPlayer)
      nowVideoPlayer.onended = this.onEnd
    }
  }

  render() {
    const {
      playerList,
      state: { progress, nowMediaIndex, isPlay, mediaList, canvasList }
    } = this;
    return (
      <div>
        <div>
          {
            mediaList.map((mediaData, index) => (
              <VideoPreview
                key={`video${index}`}
                domref={playerList[index]}
                mediaData={mediaData}
                isActive={nowMediaIndex === index} />
            ))
          }
        </div>
        <CanvasPreview canvasList={canvasList} />
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
