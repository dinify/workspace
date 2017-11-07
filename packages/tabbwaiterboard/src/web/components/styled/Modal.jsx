import styled from 'styled-components';
import { darken } from 'polished'

export const Head = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  line-height: 40px;
  background: ${p => p.bg ? darken(0.06, p.bg) : 'rgba(0,0,0,0.95)'};
  color: rgba(255,255,255,0.9);
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-sizing: border-box;
  overflow: auto;
  text-align: center;
`;

export const Body = styled.div`
  position: absolute;
  padding-top: 40px;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  .Booking {
    width: 100%
  }
`;

export const BodyPlaceholder = styled.div`
  font-size: 24px;
  text-align: center;
  color: rgba(0,0,0,0.16);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: calc(100% - 50px);
`;

export const Label = styled.div`
  font-size: 14px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${p => p.color ? p.color : 'black'};
  margin-left: 20px;
  margin-top: 20px;
`;
