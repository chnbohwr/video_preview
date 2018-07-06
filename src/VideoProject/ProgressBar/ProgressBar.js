import React, { PureComponent } from 'react';
import Dom from 'react-dom';
import PropTypes from 'prop-types';
import * as Style from './style';
import MediaItem from '../ProgressItem/ProgressItem';

const calcProgressX = ({ mediaList, nowMediaIndex, progress }) => {
  let pastTime = 0;
  for (let i = 0; i < nowMediaIndex; i += 1) {
    pastTime += mediaList[i].length;
  }
  return pastTime + progress;
};

export default class ProgressBar extends PureComponent {

  ratioVariable = 0.25
  minimumRatio = 0.25
  maxRatio = 2

  static propTypes = {
    mediaList: PropTypes.arrayOf(PropTypes.object),
    progress: PropTypes.number,
    onClickBar: PropTypes.func,
    nowMediaIndex: PropTypes.number,
  }

  static defaultProps = {
    mediaList: [],
    progress: 0,
    onClickBar: () => { },
    nowMediaIndex: 0,
  }

  state = {
    ratio: 1,
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

  onClickItem = ({ mediaData, progress }) => {
    const nowMediaIndex = this.props.mediaList.findIndex(m => m === mediaData);
    this.props.onClickBar({ nowMediaIndex, progress });
  }

  render() {
    const { mediaList, progress, nowMediaIndex } = this.props;
    const { ratio } = this.state;
    const progressPosx = calcProgressX({ mediaList, nowMediaIndex, progress }) * ratio;
    const totalWidth = mediaList.reduce((len, video) => (len + video.length), 0);
    return (
      <Style.Container>
        <Style.BarScroller>
          <Style.ItemsContainer style={{ width: totalWidth * ratio }}>
            {
              mediaList.map((data, index) => (
                <MediaItem
                  onClick={this.onClickItem}
                  isSelect={nowMediaIndex === index}
                  key={`pi_${data.title}`}
                  mediaData={data}
                  ratio={ratio} />
              ))
            }
            <Style.Progress style={{ transform: `translateX(${progressPosx}px)` }} />
          </Style.ItemsContainer>
        </Style.BarScroller>
        <Style.ButtonContainer>
          <Style.Button onClick={this.onAddRatio}>+</Style.Button>
          <Style.Button onClick={this.onMinusRatio}>-</Style.Button>
        </Style.ButtonContainer>
      </Style.Container>
    );
  }
}
