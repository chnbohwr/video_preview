import React, { Component } from 'react';
import PropTypes from 'prop-types';
import produce from 'immer';
import Draggable from 'react-draggable';
import * as Style from './style';
import MediaItem from './ProgressItem/ProgressItem';

const calcProgressX = ({ mediaList, nowMediaId, progress }) => {
  const mediaIndex = mediaList.findIndex(m => m.id === nowMediaId);
  let pastTime = 0;
  for (let i = 0; i < mediaIndex; i += 1) {
    pastTime += mediaList[i].length;
  }
  return pastTime + progress;
};

export default class ProgressBar extends Component {

  ratioVariable = 0.25
  minimumRatio = 0.25
  maxRatio = 2

  static propTypes = {
    mediaList: PropTypes.arrayOf(PropTypes.object),
    progress: PropTypes.number,
    onDragProgressBar: PropTypes.func,
    nowMediaId: PropTypes.number,
    onChangeMediaSort: PropTypes.func,
  }

  static defaultProps = {
    mediaList: [],
    progress: 0,
    onDragProgressBar: () => { },
    onChangeMediaSort: () => { },
    nowMediaId: 0,
  }

  state = {
    ratio: 1,
    draggingProgress: false,
  }

  shouldComponentUpdate() {
    if (this.state.draggingProgress) {
      return false;
    }
    return true;
  }

  onAddRatio = () => {
    const lastRatio = this.state.ratio;
    const ratio = lastRatio < this.maxRatio
      ? lastRatio + this.ratioVariable
      : lastRatio;
    this.setState({ ratio });
  }

  onMinusRatio = () => {
    const lastRatio = this.state.ratio;
    const ratio = lastRatio > this.minimumRatio
      ? lastRatio - this.ratioVariable
      : lastRatio;
    this.setState({ ratio });
  }

  onDragProgressStart = () => {
    this.setState({ draggingProgress: true });
  }

  onDragProgressStop = (e, { x }) => {

    this.setState({ draggingProgress: false }, () => {
      let progress = x;
      let mediaIndex = 0;
      const { mediaList } = this.props;
      const totalWidth = mediaList.reduce((len, video) => (len + video.length), 0);
      if (progress >= totalWidth) {
        const nowMedia = mediaList[mediaList.length - 1];
        this.props.onDragProgressBar({ nowMediaId: nowMedia.id, progress: nowMedia.length });
        return;
      }
      while (progress > mediaList[mediaIndex].length) {
        progress -= mediaList[mediaIndex].length;
        mediaIndex += 1;
      }
      this.props.onDragProgressBar({ nowMediaId: mediaList[mediaIndex].id, progress });
    });
  }

  onDragItemStart = (mediaData) => {
    this.draggingMediaData = mediaData;
  }

  onDragItemEnter = (mediaData) => {
    if (mediaData === this.draggingMediaData) {
      return;
    }
    const filtedMediaList = this.props.mediaList.filter(d => d !== this.draggingMediaData);
    const targetIndex = this.props.mediaList.findIndex(d => d === mediaData);
    const mediaList = produce(filtedMediaList, (draft) => { draft.splice(targetIndex, 0, this.draggingMediaData); });
    this.props.onChangeMediaSort({ mediaList });
  }


  render() {
    const { mediaList, progress, nowMediaId } = this.props;
    const { ratio, draggingProgress } = this.state;
    const progressPosx = calcProgressX({ mediaList, nowMediaId, progress }) * ratio;
    const position = { x: progressPosx, y: 0 };
    const totalWidth = mediaList.reduce((len, video) => (len + video.length), 0);
    return (
      <Style.Container>
        <Style.BarScroller>
          <Style.ItemsContainer style={{ width: totalWidth * ratio + 10 }}>
            {
              mediaList.map(mediaData => (
                <MediaItem
                  key={`progress_${mediaData.id}`}
                  onDragStart={this.onDragItemStart}
                  onDragEnter={this.onDragItemEnter}
                  isSelect={nowMediaId === mediaData.id}
                  mediaData={mediaData}
                  draggable={!draggingProgress}
                  ratio={ratio} />
              ))
            }
            <Draggable
              axis="x"
              position={position}
              onStop={this.onDragProgressStop}
              onStart={this.onDragProgressStart}
            >
              <Style.Progress />
            </Draggable>
          </Style.ItemsContainer>
        </Style.BarScroller>
        {/* <Style.ButtonContainer>
          <Style.Button onClick={this.onAddRatio}>+</Style.Button>
          <Style.Button onClick={this.onMinusRatio}>-</Style.Button>
        </Style.ButtonContainer> */}
      </Style.Container>
    );
  }
}
