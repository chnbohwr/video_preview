import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import * as Style from './style';
import ProgressItem from '../ProgressItem/ProgressItem';

export default class ProgressBar extends PureComponent {
  static propTypes = {
    videos: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    videos: [],
  }

  ratioVariable = 0.25
  minimumRatio = 0.25
  maxRatio = 2

  state = {
    ratio: 1,
  }

  onAddRatio = () => {
    const lastRatio = this.state.ratio;
    const ratio = lastRatio < this.maxRatio
      ? lastRatio + this.ratioVariable
      : lastRatio;
    this.setState({ ratio });
  }

  onMinusRatio = () => {
    const lastRatio = this.state.ratio;
    const ratio = lastRatio > this.minimumRatio
      ? lastRatio - this.ratioVariable
      : lastRatio;
    this.setState({ ratio });
  }

  render() {
    const { videos } = this.props;
    const { ratio } = this.state;
    const totalWidth = videos.reduce((len, video) => (len + video.length), 0);
    return (
      <Style.Container>
        <Style.BarContainer>
          <Style.ItemsContainer style={{ width: (totalWidth * ratio) + 30 }}>
            {
              videos.map(data => <ProgressItem key={`pi_${data.title}`} videoData={data} ratio={ratio} />)
            }
          </Style.ItemsContainer>
        </Style.BarContainer>
        <Style.ButtonContainer>
          <Style.Button onClick={this.onAddRatio}>+</Style.Button>
          <Style.Button onClick={this.onMinusRatio}>-</Style.Button>
        </Style.ButtonContainer>
      </Style.Container>
    );
  }
}
