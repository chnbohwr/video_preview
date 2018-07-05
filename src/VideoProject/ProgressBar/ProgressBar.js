import React, { PureComponent } from 'react';
import Dom from 'react-dom';
import PropTypes from 'prop-types';
import * as Style from './style';
import MediaItem from './MediaItem/MediaItem';

/**
 * calcaute whther the progress item should be selected
 * @param {object} mediaData
 * @param {array} mediaList
 * @param {number} progress
 */
const calcIsSelect = (mediaData, mediaList, progress) => {
  let calculatedTime = 0;
  let nowMedia = null;
  mediaList.forEach(media => {
    const mediaStartTime = calculatedTime;
    const mediaEndTime = calculatedTime + media.length;
    if (progress >= mediaStartTime && progress < mediaEndTime) {
      nowMedia = media;
    }
    calculatedTime = mediaEndTime;
  });
  if (nowMedia && nowMedia === mediaData) {
    return true;
  }
  return false;
}

export default class ProgressBar extends PureComponent {

  ratioVariable = 0.25
  minimumRatio = 0.25
  maxRatio = 2
  itemContainerElement = React.createRef();
  barContainerElement = React.createRef();

  static propTypes = {
    mediaList: PropTypes.arrayOf(PropTypes.object),
    progress: PropTypes.number,
    onClickBar: PropTypes.func,
  }

  static defaultProps = {
    mediaList: [],
    progress: 0,
    onClickBar: () => { },
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

  onClickContainer = (e) => {
    const scrollLeft = Dom.findDOMNode(this.barContainerElement.current).scrollLeft;
    const offsetLeft = Dom.findDOMNode(this.itemContainerElement.current).offsetLeft;
    const { ratio } = this.state;
    console.log(`pageX:${e.pageX} scrollLeft:${scrollLeft} offsetLeft:${offsetLeft}`);
    const pointX = Math.round(
      (scrollLeft / ratio) +
      ((e.pageX - offsetLeft) / ratio)
    );
    console.log(pointX);
    this.props.onClickBar(pointX);
  }

  render() {
    const { mediaList, progress } = this.props;
    const { ratio } = this.state;
    const totalWidth = mediaList.reduce((len, video) => (len + video.length), 0);
    return (
      <Style.Container>
        <Style.BarContainer ref={this.barContainerElement}>
          <Style.ItemsContainer ref={this.itemContainerElement} style={{ width: (totalWidth * ratio) + 30 }} onClick={this.onClickContainer}>
            {
              mediaList.map(data =>
                <MediaItem
                  isSelect={calcIsSelect(data, mediaList, progress)}
                  key={`pi_${data.title}`}
                  mediaData={data}
                  ratio={ratio} />)
            }
            <Style.Progress style={{ x: progress * ratio }} />
          </Style.ItemsContainer>
        </Style.BarContainer>
        <Style.ButtonContainer>
          <Style.Button onClick={this.onAddRatio}>+</Style.Button>
          <Style.Button onClick={this.onMinusRatio}>-</Style.Button>
        </Style.ButtonContainer>
      </Style.Container>
    );
  }
}
