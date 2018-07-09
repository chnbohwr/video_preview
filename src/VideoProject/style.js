import styled from 'styled-components';

export const MainContainer = styled.div`
  position: relative;
  width: 800px;
  height: 800px;
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
  background: #ccc;
`;
