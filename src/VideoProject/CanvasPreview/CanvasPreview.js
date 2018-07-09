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
  }

  static defaultProps = {
    canvasList: [],
  }

  cd = totalWidthHeight(this.props.canvasList)

  state = {
    position: { x: 0, y: 0, },
    ratio: 1,
  }

  onDragStop = (e, d) => {
    this.setState({ position: { x: d.x, y: d.y } });
  }

  onResize = (e, direction, ref) => {
    const width = parseInt(ref.style.width, 10);
    const ratio = width / this.cd.width;
    this.setState({ ratio });
  }

  render() {
    const { canvasList } = this.props;
    const { position, ratio, } = this.state;
    const size = { width: this.cd.width * ratio, height: this.cd.height * ratio };
    return (
      <Rnd
        style={{ border: '1px solid yellow' }}
        position={position}
        size={size}
        onResize={this.onResize}
        lockAspectRatio
        onDragStop={this.onDragStop}>
        <svg width={size.width} height={size.height}>
          {
            canvasList.map(data => (
              <path
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
