import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import * as Style from './style';

export default class MediaItem extends PureComponent {
  static propTypes = {
    mediaData: PropTypes.object,
    ratio: PropTypes.number,
    isSelect: PropTypes.bool,
  }

  static defaultProps = {
    mediaData: {},
    ratio: 1,
    isSelect: false,
  }

  render() {
    const { mediaData, ratio, isSelect } = this.props;
    const style = {
      width: mediaData.length * ratio
    };
    return (
      <Style.Item style={style} title={mediaData.title} isSelect={isSelect} />
    );
  }
}
