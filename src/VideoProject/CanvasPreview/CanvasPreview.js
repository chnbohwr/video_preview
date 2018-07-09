import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { map } from 'rxjs/operators';

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
  static defaultProps = {
    canvasList: [],
  }
  render() {
    const { canvasList } = this.props;
    const cd = totalWidthHeight(canvasList);
    const containerStyle = { width: cd.maxX - cd.minX, height: cd.maxY - cd.minY };

    return (
      <div style={containerStyle}>
        <svg width={containerStyle.width} height={containerStyle.height}>
          {
            canvasList.map(data => (
            <polygon points={`
            ${data.coordinate_in[0].x},${data.coordinate_in[0].y}
            ${data.coordinate_in[1].x},${data.coordinate_in[1].y}
            ${data.coordinate_in[2].x},${data.coordinate_in[2].y}
            ${data.coordinate_in[3].x},${data.coordinate_in[3].y}
            `} />
          ))
          }
        </svg>
      </div>
    );
  }
}
