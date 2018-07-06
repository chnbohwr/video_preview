import styled from 'styled-components';

export const Item = styled.div`
  background-color: ${p => (p.isSelect ? '#999' : '#ccc')};
  box-sizing: border-box;
  height: 100%;
  border-right: 1px solid #777;
`;