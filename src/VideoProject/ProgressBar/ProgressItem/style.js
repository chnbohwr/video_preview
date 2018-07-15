import styled from 'styled-components';

export const Item = styled.div`
  background-color: ${p => (p.isSelect ? '#999' : '#ccc')};
  box-sizing: border-box;
  height: 100%;
  border-right: 1px solid #777;
  display: flex;
  align-items: center;
  padding-left: 10px;
  color: ${p => (p.isSelect ? '#ddd' : '#555')};
  cursor: pointer;
  user-select: none;
  position: relative;
`;

export const Resizer = styled.div`
  position: absolute;
  user-select: none;
  width: 10px;
  height: 100%;
  top: 0px;
  right: -5px;
  cursor: col-resize;
`;
