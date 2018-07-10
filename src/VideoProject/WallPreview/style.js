import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 800px;
  overflow: hidden;
`;

export const LayoutContainer = styled.div`
  position: relative;
  width: 100%;
  transform-origin: 0 0;
  user-select: none;
`;

export const VideosContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  touch-action: none;
  user-select: none;
`;

export const CanvasContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
`;
