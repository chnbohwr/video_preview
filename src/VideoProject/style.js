import styled from 'styled-components';

export const Scroller = styled.div`
  width: 100%;
  height: 800px;
  overflow: scroll;
`;

export const MainContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const VideosContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
`;

export const LayoutContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
`;
