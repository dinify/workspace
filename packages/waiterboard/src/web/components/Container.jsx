import styled from 'styled-components';

export default styled.div`
  width: 1200px;
  min-width: 630px;
  margin: 0 auto;
  overflow: auto;
  ${(p) => p.noHeight ? '': 'height: 100vh;'}
  ${(p) => p.noHeight ? '': 'padding-bottom: 200px;'}
  @media (max-width: 1200px) {
    width: 100%;
  }
  ${(p) => p.flex ? 'column-width: 590px; column-gap: 10px; ': ''}
`;
