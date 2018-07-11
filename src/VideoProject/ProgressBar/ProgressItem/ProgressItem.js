import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import * as Style from './style';

export default class MediaItem extends PureComponent {
  static propTypes = {
    mediaData: PropTypes.object,
    ratio: PropTypes.number,
    isSelect: PropTypes.bool,
    draggable: PropTypes.bool,
    onDragStart: PropTypes.func,
    onDragEnter: PropTypes.func,
  }

  domNode = React.createRef()
  initClinetX = 0

  static defaultProps = {
    mediaData: {},
    ratio: 1,
    isSelect: false,
    draggable: false,
    onDragStart: () => { },
    onDragEnter: () => { },
  }

  componentDidMount() {
    this.domNode.current.ondragstart = () => {
      this.props.onDragStart(this.props.mediaData);
    };
    this.domNode.current.ondragenter = () => {
      this.props.onDragEnter(this.props.mediaData);
    };
  }

  render() {
    const {
      mediaData, ratio, isSelect, draggable
    } = this.props;
    const style = {
      width: mediaData.length * ratio
    };
    return (

      <Style.Item
        innerRef={this.domNode}
        style={style}
        title={mediaData.title}
        draggable={draggable}
        isSelect={isSelect}>
        {mediaData.title}
      </Style.Item>

    );
  }
}
