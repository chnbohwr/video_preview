import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import VideoPreview from './VideoPreview/index';

export default class LayoutPreview extends PureComponent {
  static propTypes = {
    mediaList: PropTypes.arrayOf(PropTypes.object),
    progress: PropTypes.number,
    nowMediaIndex: PropTypes.number,
    onUpdateProgress: PropTypes.func,
    onEnd: PropTypes.func,
    isPlay: PropTypes.bool,
  }

  static defaultProps = {
    mediaList: [],
    progress: 0,
    nowMediaIndex: 0,
    onUpdateProgress: () => { },
    onEnd: () => { },
    isPlay: PropTypes.bool,
  }

  constructor(props) {
    super(props);
    this.playerList = props.mediaList.map(() => React.createRef());
  }

  render() {
    const {
      mediaList, progress, nowMediaIndex,
      onUpdateProgress, onEnd, isPlay,
    } = this.props;
    return (
      <div>
        {
          mediaList.map((mediaData, index) => (
            <VideoPreview
              onUpdateProgress={onUpdateProgress}
              onEnd={onEnd}
              key={`video${index}`}
              mediaData={mediaData}
              isPlay={isPlay}
              progress={progress}
              isActive={nowMediaIndex === index}
            />
          ))
        }
      </div>
    );
  }
}
