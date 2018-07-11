import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Rnd from 'react-rnd';

const totalWidthHeight = (canvasList) => {
  const xy = canvasList.reduce((acc, val) => {
    val.coordinate_out.forEach((coord) => {
      acc = {
        minX: (coord.x < acc.minX) ? coord.x : acc.minX,
        minY: (coord.y < acc.minY) ? coord.y : acc.minY,
        maxX: (coord.x > acc.maxX) ? coord.x : acc.maxX,
        maxY: (coord.y > acc.maxY) ? coord.y : acc.maxY,
      };
    });
    return acc;
  },
    {
      minX: Infinity,
      minY: Infinity,
      maxX: 0,
      maxY: 0
    });
  return { width: xy.maxX - xy.minX, height: xy.maxY - xy.minY };
};

export default class CanvasPreview extends PureComponent {
  static propTypes = {
    canvasList: PropTypes.array,
    position: PropTypes.object,
    ratio: PropTypes.number,
    onChange: PropTypes.func,
    id: PropTypes.number,
    isActive: PropTypes.bool,
  }

  static defaultProps = {
    id: 1,
    canvasList: [],
    position: { x: 0, y: 0, },
    ratio: 1,
    onChange: () => { },
    isActive: false,
  }

  cd = totalWidthHeight(this.props.canvasList)

  onDragStop = (e, d) => {
    const { ratio, id } = this.props;
    this.props.onChange({ position: { x: d.x, y: d.y }, ratio, id });
  }

  onResize = (e, direction, ref) => {
    const width = parseInt(ref.style.width, 10);
    const ratio = width / this.cd.width;
    const { position, id } = this.props;
    this.props.onChange({ position, ratio, id });
  }

  render() {
    const {
      canvasList, position, ratio,
    } = this.props;
    const size = { width: this.cd.width * ratio, height: this.cd.height * ratio };
    const style = { border: '1px solid yellow'};
    return (
      <Rnd
        className="canvasDraggable"
        style={style}
        position={position}
        size={size}
        minWidth={this.cd.width}
        minHeight={this.cd.height}
        onResize={this.onResize}
        lockAspectRatio
        onDragStop={this.onDragStop}>
        <svg width={size.width} height={size.height}>
          {
            canvasList.map((data, i) => (
              <path
                key={`canvas${i}`}
                stroke="yellow"
                fill="transparent"
                d={`
              M${data.coordinate_in[0].x * ratio} ${data.coordinate_in[0].y * ratio}
              L${data.coordinate_in[1].x * ratio} ${data.coordinate_in[1].y * ratio}
              L${data.coordinate_in[2].x * ratio} ${data.coordinate_in[2].y * ratio}
              L${data.coordinate_in[3].x * ratio} ${data.coordinate_in[3].y * ratio}
              Z
              `} />
            ))
          }
        </svg>
      </Rnd>
    );
  }
}
