import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const totalWidthHeight = (canvasList) => canvasList.reduce((acc, val) => {
  val.coordinate_out.forEach(coord => {
    acc = {
      minX: (coord.x < acc.minX) ? coord.x : acc.minX,
      minY: (coord.y < acc.minY) ? coord.y : acc.minY,
      maxX: (coord.x > acc.maxX) ? coord.x : acc.maxX,
      maxY: (coord.y > acc.maxY) ? coord.y : acc.maxY,
    }
  });
  return acc;
},
  {
    minX: Infinity,
    minY: Infinity,
    maxX: 0,
    maxY: 0
  }
);


export default class CanvasPreview extends PureComponent {
  static propTypes = {
    canvasList: PropTypes.array,
  }
  render() {
    const { canvasList } = this.props;
    const containerStyle = totalWidthHeight(canvasList);
    return (
      <div style={containerStyle}>
        <svg width={} height={} viewBox={}>

        </svg>
      </div>
    );
  }
}
