import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import produce from 'immer';
import { DraggableCore } from 'react-draggable';
import VideoPreview from './VideoPreview/VideoPreview';
import CanvasPreview from './CanvasPreview/CanvasPreview';
import * as Style from './style';

export default class WallPreview extends PureComponent {
  static propTypes = {
    mediaList: PropTypes.array,
    canvasList: PropTypes.array,
    nowMediaIndex: PropTypes.number,
    wallDataset: PropTypes.array,
    onChangeLayout: PropTypes.func,
    playerList: PropTypes.array,
    layoutRatio: PropTypes.number,
  }
  static defaultProps = {
    mediaList: [],
    canvasList: [],
    nowMediaIndex: 0,
    wallDataset: [],
    onChangeLayout: () => { },
    playerList: [],
    layoutRatio: 1
  }

  state = {
    previewDataset: this.props.mediaList.map(() => ({ x: 0, y: 0 })),
  }

  onDragPreview = (e, d) => {
    const { previewDataset } = this.state;
    const { nowMediaIndex } = this.props;
    const x = previewDataset[nowMediaIndex].x + d.deltaX;
    const y = previewDataset[nowMediaIndex].y + d.deltaY;
    const newPreviewDataset = produce(this.state.previewDataset, (dataset) => {
      dataset[this.props.nowMediaIndex] = { x, y };
    });
    this.setState({ previewDataset: newPreviewDataset });
  }

  render() {
    const {
      mediaList, nowMediaIndex, playerList,
      wallDataset, canvasList, onChangeLayout,
      layoutRatio,
    } = this.props;
    const { previewDataset } = this.state;
    return (
      <Style.Container>
        {
          mediaList.map((mediaData, index) => (
            <DraggableCore
              key={`wall${index}`}
              onDrag={this.onDragPreview}
              cancel=".canvasDraggable">
              <Style.LayoutContainer
                style={{
                  display: nowMediaIndex === index ? 'block' : 'none',
                  transform: `scale(${layoutRatio})
                  translate(${previewDataset[index].x}px,${previewDataset[index].y}px)`
                }}
              >
                <React.Fragment>
                  <Style.VideosContainer>
                    <VideoPreview
                      key={`video${index}`}
                      domref={playerList[index]}
                      mediaData={mediaData}
                    />
                  </Style.VideosContainer>
                  <Style.CanvasContainer>
                    <CanvasPreview
                      key={`canvas${wallDataset[index].id}`}
                      canvasList={canvasList}
                      position={wallDataset[index].position}
                      ratio={wallDataset[index].ratio}
                      id={wallDataset[index].id}
                      onChange={onChangeLayout} />
                  </Style.CanvasContainer>
                </React.Fragment>
              </Style.LayoutContainer>
            </DraggableCore>
          ))
        }
      </Style.Container>
    );
  }
}
