import styled from 'styled-components';

export const FormBox = styled.div`
  background: #fff;
  display: inline-block;
  width: 280px;
  border: 1px solid #CED0DA;
  vertical-align: top;
  margin: 10px;
  overflow: hidden;
`
export const FormBoxHead = styled.div`
  background: #F2F4F7;
  padding: 10px;
  font-size: 12px;
  border-bottom: 1px solid #CED0DA;
`
export const FormBoxBody = styled.div`
  background: #fff;
  padding: 0 10px 10px 10px;
  padding-top: ${p => p.pt || 0}px;
  padding-bottom: ${p => p.pb || 10}px;
  text-align: ${p => p.center ? 'center' : 'left'};
  input, select, textarea {
    border: 1px solid #CED0DA;
    margin-top: 10px;
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    background: rgba(239,243,246,0.7);
  }
  .FormInput {
    display: ${p => p.half ? 'inline-block' : 'block'};
    width: ${p => p.half ? '46.7%' : '100%'};
  }
  select {
    height: 34px;
  }
`
export const FormBoxSubmit = styled.button`
  background-color: ${p => p.primary ? 'rgb(38,156,244)' : 'rgb(220,224,230)'};
  margin: 10px 0 0 0;
  outline: none;
  padding: 10px 15px;
  border: 1px solid ${p => p.primary ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'};
  cursor: pointer;
  border-radius: 5px;
  color: ${p => p.primary ? 'white' : '#666'};
  width: 100%;
  &:hover {
    background-color: ${p => p.primary ? 'rgb(28,146,234)' : 'rgb(210,214,220)'};
  }
  &:active {
    background-color: ${p => p.primary ? 'rgb(18,126,214)' : 'rgb(200,204,210)'};
    border-color: transparent;
  }
`

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
`

export const Label = styled.div`
  font-size: 14px;
  margin-top: 18px;
  margin-bottom: -4px;
`