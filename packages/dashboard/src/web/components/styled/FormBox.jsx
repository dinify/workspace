import styled from 'styled-components';

export const FormBox = styled.div`
  background: #fff;
  display: inline-block;
  width: ${p => (p.fullWidth ? '100%' : '280px')};
  border: none;
  vertical-align: top;
  margin: ${p => (p.fullWidth ? '10px 0' : '10px')};
  overflow: hidden;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
  border-radius: 2px;
`;
export const FormBoxHead = styled.div`
  background: rgba(0, 0, 50, 0.03);
  padding: 10px;
  font-size: 14px;
`;
export const FormBoxBody = styled.div`
  background: #fff;
  padding: 0 10px 10px 10px;
  padding-top: ${p => p.pt || 0}px;
  padding-bottom: ${p => p.pb || 10}px;
  text-align: ${p => (p.center ? 'center' : 'left')};
  .sep {
    display: inline-block;
    padding: 14px 5px;
    vertical-align: top;
  }
  .FormInput {
    display: ${p => (p.half ? 'inline-block' : 'block')};
    width: ${p => (p.half ? '46.7%' : '100%')};
  }
`;
export const FormBoxSubmit = styled.button`
  background-color: ${p =>
    p.primary ? 'rgb(38,156,244)' : 'rgb(220,224,230)'};
  margin: 10px 0 0 0;
  outline: none;
  padding: 10px 15px;
  border: 1px solid
    ${p => (p.primary ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)')};
  cursor: pointer;
  border-radius: 5px;
  color: ${p => (p.primary ? 'white' : '#666')};
  width: 100%;
  &:hover {
    background-color: ${p =>
      p.primary ? 'rgb(28,146,234)' : 'rgb(210,214,220)'};
  }
  &:active {
    background-color: ${p =>
      p.primary ? 'rgb(18,126,214)' : 'rgb(200,204,210)'};
    border-color: transparent;
  }
`;

export const ThinButton = styled.button`
  background-color: rgb(220, 224, 230);
  margin: 0 auto;
  outline: none;
  padding: 5px 15px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  cursor: pointer;
  border-radius: 50px;
  color: ${p => (p.primary ? 'white' : '#666')};
`;

export const FieldWrapper = styled.div`
  position: relative;
  input {
    padding-left: 35px;
  }
  i {
    position: absolute;
    display: block;
    width: 30px;
    top: 11px;
    left: 5px;
    font-size: 28px;
    text-align: center;
  }
  a i {
    color: grey;
  }
`;

export const Label = styled.div`
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 18px;
  margin-bottom: -4px;
`;

export const CardLabel = styled.div`
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: -4px;
  text-align: center;
  color: #999;
`;

export const ContentWrapper = styled.div`
  margin: 14px 10px;
`;