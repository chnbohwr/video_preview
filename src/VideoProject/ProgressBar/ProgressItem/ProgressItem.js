import React, { PureComponent } from 'react';
import Dom from 'react-dom';
import PropTypes from 'prop-types';
import * as Style from './style';

export default class MediaItem extends PureComponent {
  static propTypes = {
    mediaData: PropTypes.object,
    ratio: PropTypes.number,
    isSelect: PropTypes.bool,
    onClick: PropTypes.func,
  }

  domNode = React.createRef();

  static defaultProps = {
    mediaData: {},
    ratio: 1,
    isSelect: false,
    onClick: () => { }
  }

  onClick = (e) => {
    const { ratio, mediaData } = this.props;
    const { x } = Dom.findDOMNode(this.domNode.current).getBoundingClientRect();
    const { pageX } = e;
    const progress = (pageX - x) / ratio;
    this.props.onClick({ mediaData, progress });
  }

  render() {
    const { mediaData, ratio, isSelect } = this.props;
    const style = {
      width: mediaData.length * ratio
    };
    return (
      <Style.Item
        ref={this.domNode}
        onClick={this.onClick}
        style={style}
        title={mediaData.title}
        isSelect={isSelect} />
    );
  }
}
