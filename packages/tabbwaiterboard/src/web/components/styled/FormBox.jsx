import styled from 'styled-components';

export const FormBox = styled.div`
  background: rgba(0,0,0,0.1);
  display: inline-block;
  width: 280px;
  vertical-align: top;
  margin: 10px
`
export const FormBoxHead = styled.div`
  background: rgba(0,0,0,0.2);
  padding: 20px;
  font-size: 16px;
  color: white;
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 2px;
  font-weight: 200;
`
export const FormBoxBody = styled.div`
  text-align: ${p => p.center ? 'center' : 'left'};
  color: white;
  input {
    border: none;
    outline: none;
    color: white;
    background: rgba(255,255,255,0.1);
    width: 240px;
    padding: 10px;
    margin: 20px 20px 0;
  }
  &.modry {
    padding: 10px 10px 0 10px;
  }
  a {
    color: white;
    text-decoration: none;
  }
`
export const FormBoxSubmit = styled.button`
  background-color: rgb(231,76,60);
  outline: none;
  border: none;
  cursor: pointer;
  color: white;
  transition: all 100ms ease-in-out;
  width: 240px;
  padding: 10px;
  margin: 20px;
  &:hover {
    background-color: rgb(221,66,50);
  }
  &:active {
    transform: scale(0.95);
  }
`

export const FormBoxChoice = styled.div`
  background-color: rgba(0,0,0,0.2);
  width: 100%;
  margin-bottom: 10px;
  padding: 20px 0;
  text-align: center;
  cursor: pointer;
  transition: background 100ms ease-in-out;
  &:hover {
    background: black;
  }
`
