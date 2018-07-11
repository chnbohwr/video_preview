import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

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
    const { mediaData, domref } = this.props;
    return (
      <React.Fragment>
        {
          mediaData.type === MEDIA_TYPE.IMAGE
            ? (
              <img
                draggable="false"
                alt=""
                src={mediaData.sources[0]}
              />
            ) : (
              <video
                muted
                ref={domref}>
                <source src={mediaData.sources[0]} type="video/mp4" />
              </video>
            )
        }
      </React.Fragment>
    );
  }
}
