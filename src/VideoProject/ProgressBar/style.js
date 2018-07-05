import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

export const BarContainer = styled.div`
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
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 40px;
  padding: 0 5px;
  justify-content: space-between;
`;

export const Button = styled.button`
  font-size: 8px;
  height: 18px;
  line-height: 18px;
`;
