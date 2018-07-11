import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const BarScroller = styled.div`
  width: calc(100% - 40px);
  height: 40px;
  border: 1px solid #777;
  overflow-x: scroll;
  overflow-y: hidden;
`;

export const ItemsContainer = styled.div`
  position: relative;
  display: flex;
  height: 100%;
`;

export const ButtonContainer = styled.div`

`;

export const Button = styled.button`
`;

export const Progress = styled.div`
  width: 5px;
  height: 100%;
  position: absolute;
  top: 0;
  left: -2px;
  background-color: red;
`;
