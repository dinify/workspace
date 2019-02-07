// @flow
import styled from 'styled-components';

export const HorizontalLine = styled.div`
  margin-top: ${p => p.mt || 10}px;
  margin-bottom: ${p => p.mb || 0}px;
  width: 100%;
  height: 1px;
  background: ${p => (p.dark ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)')};
`;
