import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImgPlayer from './ImgPlayer';

const VIDEO_WIDTH = 600;

const MEDIA_TYPE = {
  IMAGE: "i",
  VIDEO: "v"
};

export default class VideoPreview extends Component {
  domEle = React.createRef();
  static propTypes = {
    mediaData: PropTypes.object,
    isPlay: PropTypes.bool,
    progress: PropTypes.number,
    isActive: PropTypes.bool,
    onUpdateProgress: PropTypes.func,
    onEnd: PropTypes.func,
  }
  static defaultProps = {
    mediaData: {},
    isPlay: false,
    isActive: false,
    progress: 0,
    onUpdateProgress: () => { },
    onEnd: () => { }
  }
  componentDidMount() {
    // making player
    const {
      mediaData, isPlay, progress, isActive,
    } = this.props;

    if (mediaData.type === MEDIA_TYPE.IMAGE) {
      this.player = new ImgPlayer(mediaData.length);
    } else {
      this.player = this.domEle.current;
    }
    if (isPlay && isActive) { this.player.play(); this.player.currentTime = progress; }
    this.player.ontimeupdate = () => {
      const time = this.player.currentTime;
      this.props.onUpdateProgress({ progress: time });
    };
    this.player.onended = this.props.onEnd;
  }

  shouldComponentUpdate(nextProps) {
    console.log('video preview scu: ', nextProps);
    const {
      mediaData, isPlay, progress, isActive,
    } = this.props;
    if (
      (nextProps.mediaData !== mediaData)
      || (nextProps.isActive !== isActive)
    ) {
      if (nextProps.isActive) {
        this.player.currentTime = nextProps.progress;
        this.player.play();
      } else {
        this.player.currentTime = 0;
        this.player.pause();
      }
      return true;
    }
    if (!isPlay && nextProps.isPlay && isActive) {
      this.player.play();
    }
    if (isPlay && !nextProps.isPlay && isActive) {
      this.player.pause();
    }
    // if (nextProps.progress !== progress) {
    //   console.log()
    //   this.player.currentTime = progress;
    // }
    return false;
  }
  render() {
    console.log('video render trigger');
    const { mediaData, isActive } = this.props;
    return (
      <div style={{ display: isActive ? 'block' : 'none' }}>
        {
          mediaData.type === MEDIA_TYPE.IMAGE
            ? (
              <img
                alt=""
                width={VIDEO_WIDTH}
                height="400"
                src={mediaData.sources[0]}
              />
            ) : (
              <video
                width={VIDEO_WIDTH}
                height="400"
                muted
                ref={this.domEle}>
                <source src={mediaData.sources[0]} type="video/mp4" />
              </video>
            )
        }
      </div>
    );
  }
}
