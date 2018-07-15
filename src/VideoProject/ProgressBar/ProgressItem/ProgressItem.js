import React, { PureComponent } from 'react';
import { DraggableCore } from 'react-draggable';
import PropTypes from 'prop-types';
import * as Style from './style';

const MEDIA_TYPE = {
  IMAGE: "i",
  VIDEO: "v"
};

export default class MediaItem extends PureComponent {
  static propTypes = {
    mediaData: PropTypes.object,
    ratio: PropTypes.number,
    isSelect: PropTypes.bool,
    draggable: PropTypes.bool,
    onDragStart: PropTypes.func,
    onDragEnter: PropTypes.func,
    onChangeMediaLength: PropTypes.func,
  }

  $item = React.createRef()
  $resizer = React.createRef()
  initClinetX = 0

  static defaultProps = {
    mediaData: {},
    ratio: 1,
    isSelect: false,
    draggable: false,
    onDragStart: () => { },
    onDragEnter: () => { },
    onChangeMediaLength: () => { },
  }

  state = {
    isResizing: false,
  }

  onResizeStart = () => {
    this.setState({ isResizing: true });
  }
  onResize = (e, d) => {
    this.props.onChangeMediaLength({
      id: this.props.mediaData.id,
      deltaLength: d.deltaX
    });
  }
  onResizeEnd = () => {
    this.setState({ isResizing: false });
  }

  componentDidMount() {
    this.$item.current.ondragstart = () => {
      this.props.onDragStart(this.props.mediaData);
    };
    this.$item.current.ondragenter = () => {
      this.props.onDragEnter(this.props.mediaData);
    };
  }

  render() {
    const {
      props: {
        mediaData, ratio, isSelect, draggable,
      },
      state: { isResizing },
    } = this;
    const style = {
      width: mediaData.length * ratio
    };
    return (

      <Style.Item
        innerRef={this.$item}
        style={style}
        title={mediaData.title}
        draggable={draggable && !isResizing}
        isSelect={isSelect}>
        {mediaData.title}
        {
          (mediaData.type === MEDIA_TYPE.IMAGE)
          && (
            <DraggableCore
              onStart={this.onResizeStart}
              onDrag={this.onResize}
              onStop={this.onResizeEnd}>
              <Style.Resizer />
            </DraggableCore>
          )
        }

      </Style.Item>

    );
  }
}
