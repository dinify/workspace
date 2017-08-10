import styled from 'styled-components';

export const FormBox = styled.div`
  background: #fff;
  display: inline-block;
  width: 280px;
  border-radius: 5px;
  border: 1px solid #CED0DA;
  vertical-align: top;
  margin: 10px
`
export const FormBoxHead = styled.div`
  background: #F2F4F7;
  border-radius: 5px 5px 0 0;
  padding: 10px;
  font-size: 12px;
  border-bottom: 1px solid #CED0DA;
`
export const FormBoxBody = styled.div`
  background: #fff;
  border-radius: 0 0 5px 5px;
  padding: 0 10px 10px 10px;
  padding-top: ${p => p.pt || 0}px;
  padding-bottom: ${p => p.pb || 10}px;
  text-align: ${p => p.center ? 'center' : 'left'};
  input {
    border: 1px solid #CED0DA;
    margin-top: 10px;
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    background: rgba(239,243,246,0.7);
  }
`
export const FormBoxSubmit = styled.button`
  background-color: rgb(38,156,244);
  margin: 10px 0 0 0;
  outline: none;
  padding: 10px 15px;
  border: 1px solid rgba(255,255,255,0.1);
  cursor: pointer;
  border-radius: 5px;
  color: white;
  width: 100%;
  &:hover {
    background-color: rgb(28,146,234);
  }
  &:active {
    background-color: rgb(18,126,214);
    border-color: transparent;
  }
`
