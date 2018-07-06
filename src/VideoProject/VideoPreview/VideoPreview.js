import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const VIDEO_WIDTH = 600;

const MEDIA_TYPE = {
  IMAGE: "i",
  VIDEO: "v"
};

export default class VideoPreview extends PureComponent {
  domEle = React.createRef();
  static propTypes = {
    domref: PropTypes.any,
    mediaData: PropTypes.object,
    isActive: PropTypes.bool,
  }
  static defaultProps = {
    domref: React.createRef(),
    mediaData: {},
    isActive: false,
  }
  render() {
    console.log('video render trigger');
    const { mediaData, isActive, domref } = this.props;
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
                ref={domref}>
                <source src={mediaData.sources[0]} type="video/mp4" />
              </video>
            )
        }
      </div>
    );
  }
}