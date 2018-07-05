import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import * as Style from './style';

export default class ProgressItem extends PureComponent {
  static propTypes = {
    videoData: PropTypes.object,
    ratio: PropTypes.number,
  }

  static defaultProps = {
    videoData: {},
    ratio: 1,
  }

  render() {
    const { videoData, ratio } = this.props;
    const style = {
      width: videoData.length * ratio
    };
    return (
      <Style.Item style={style} title={videoData.title} />
    );
  }
}
