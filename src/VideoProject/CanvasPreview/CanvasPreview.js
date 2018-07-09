import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Rnd from 'react-rnd';

const totalWidthHeight = canvasList => canvasList.reduce((acc, val) => {
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
    size: {
      width: this.cd.maxX - this.cd.minX,
      height: this.cd.maxY - this.cd.minY
    },
    ratio: 1,
    viewBox: `0 0 ${this.cd.maxX - this.cd.minX} ${this.cd.maxY - this.cd.minY}`
  }

  onDragStop = (e, d) => {
    this.setState({ position: { x: d.x, y: d.y } });
  }

  onResize = (e, direction, ref) => {
    const width = parseInt(ref.style.width, 10);
    const height = parseInt(ref.style.height, 10);
    const originalWidth = this.cd.maxX - this.cd.minX;
    const originalHeight = this.cd.maxY - this.cd.minY;
    const ratio = width / originalWidth;
    this.setState({
      ratio,
      size: { width, height }
    });
  }

  render() {
    const { canvasList } = this.props;
    const {
      size, position, viewBox, ratio,
    } = this.state;
    return (
      <Rnd
        style={{ border: '1px solid yellow' }}
        position={position}
        size={size}
        onResize={this.onResize}
        lockAspectRatio
        onDragStop={this.onDragStop}>
        <svg width={size.width} height={size.height} viewBox={viewBox}>
          {
            canvasList.map(data => (
              <path
                stroke="yellow"
                fill="transparent"
                d={`
              M${data.coordinate_in[0].x} ${data.coordinate_in[0].y}
              L${data.coordinate_in[1].x} ${data.coordinate_in[1].y}
              L${data.coordinate_in[2].x} ${data.coordinate_in[2].y}
              L${data.coordinate_in[3].x} ${data.coordinate_in[3].y}
              Z
              `} />
            ))
          }
        </svg>
      </Rnd>
    );
  }
}
