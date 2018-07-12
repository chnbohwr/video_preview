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
    nowMediaId: PropTypes.number,
    wallDataset: PropTypes.object,
    onChangeLayout: PropTypes.func,
    playerSet: PropTypes.object,
    layoutRatio: PropTypes.number,
  }
  static defaultProps = {
    mediaList: [],
    canvasList: [],
    nowMediaId: 0,
    wallDataset: {},
    onChangeLayout: () => { },
    playerSet: {},
    layoutRatio: 1
  }

  state = {
    previewDataset: this.props.mediaList.reduce((dataset, mediaData) => {
      dataset[mediaData.id] = { x: 0, y: 0 };
      return dataset;
    }, {}),
  }

  onDragPreview = (e, d) => {
    const { previewDataset } = this.state;
    const { nowMediaId } = this.props;
    const x = previewDataset[nowMediaId].x + d.deltaX;
    const y = previewDataset[nowMediaId].y + d.deltaY;
    const newPreviewDataset = produce(this.state.previewDataset, (dataset) => {
      dataset[nowMediaId] = { x, y };
    });
    this.setState({ previewDataset: newPreviewDataset });
  }

  render() {
    const {
      mediaList, nowMediaId, playerSet,
      wallDataset, canvasList, onChangeLayout,
      layoutRatio,
    } = this.props;
    const { previewDataset } = this.state;
    return (
      <Style.Container>
        {
          mediaList.map(mediaData => (
            <DraggableCore
              key={`wall${mediaData.id}`}
              onDrag={this.onDragPreview}
              cancel=".canvasDraggable">
              <Style.LayoutContainer
                style={{
                  display: nowMediaId === mediaData.id ? 'block' : 'none',
                  transform: `scale(${layoutRatio})
                  translate(${previewDataset[mediaData.id].x}px,${previewDataset[mediaData.id].y}px)`
                }}
              >
                <React.Fragment>
                  <Style.VideosContainer>
                    <VideoPreview
                      key={`video${mediaData.id}`}
                      domref={playerSet[mediaData.id]}
                      mediaData={mediaData}
                    />
                  </Style.VideosContainer>
                  <Style.CanvasContainer>
                    <CanvasPreview
                      key={`canvas${mediaData.id}`}
                      id={mediaData.id}
                      canvasList={canvasList}
                      position={wallDataset[mediaData.id].position}
                      ratio={wallDataset[mediaData.id].ratio}
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
