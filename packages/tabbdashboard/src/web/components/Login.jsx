// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import type { Error } from '../../flow';

import Input from 'react-enhanced-form'

const Content = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const FormBox = styled.div`
  color: white;
  background-color: rgb(34,44,60);
  width: 280px;
  border-radius: 8px;
`;

const FormBoxHeader = styled.div`
  color: white;
  background-color: rgb(49,67,95);
  text-align: center;
  height: 50px;
  line-height: 50px;
  border-radius: 8px 8px 0 0;
  font-weight: 300;
`;

const FormBoxBody = styled.div`
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 10px;
  padding-bottom: 20px;
`;

const InputStyle = {
  default: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    margin: '10px 0 0 0',
    outline: 'none',
    padding: '10px 15px',
    border: '1px solid rgba(255,255,255,0.4)',
    borderRadius: '5px',
    color: 'white',
    width: '250px'
  },
  onFocus: { borderColor: 'rgb(39, 174, 96)' },
  //onError: { border: '1px solid rgb(192, 57, 43)' }
}

const SmallInputStyle = {
  default: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    margin: '10px 0 0 0',
    outline: 'none',
    padding: '10px 15px',
    border: '1px solid rgba(255,255,255,0.4)',
    borderRadius: '5px',
    color: 'white',
    width: '180px'
  },
  onFocus: { borderColor: 'rgb(39, 174, 96)' },
  //onError: { border: '1px solid rgb(192, 57, 43)' }
}

const FormBoxSubmit = styled.button`
  background-color: rgb(38,156,244);
  margin: 20px 0 0 0;
  outline: none;
  padding: 10px 15px;
  border: 1px solid rgba(255,255,255,0.1);
  cursor: pointer;
  border-radius: 5px;
  color: white;
  width: 250px;
  &:hover {
    background-color: rgb(28,146,234);
  }
  &:active {
    background-color: rgb(18,126,214);
    border-color: transparent;
  }
`;

const Button = styled.button`
  background-color: rgb(255,152,121);
  margin: 20px 0 0 0;
  outline: none;
  padding: 10px 15px;
  border: 1px solid rgba(255,255,255,0.1);
  cursor: pointer;
  border-radius: 5px;
  color: white;
  &:hover {
    background-color: rgb(245,142,111);
  }
  &:active {
    background-color: rgb(225,122,91);
    border-color: transparent;
  }
`;

type LoginProps = {
  lastError: Error,
};

const TopRight = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 600px;
`;


const Login = ({ lastError }: LoginProps) =>
  (<Content>
      {/*
      <TopRight className="vhs-right">

        <form onSubmit={() => console.log('submited')}>
          <Input
            type='text'
            value=''
            placeholder='Administrator'
            onChange={(data, error) => console.log('change', data, error)}
            onMount={(data,error) => console.log('mount', data, error)}
            style={SmallInputStyle}
            required
          />
          <Input
            type='password'
            value=''
            placeholder='Password'
            onChange={(data, error) => console.log('change', data, error)}
            onMount={(data,error) => console.log('mount', data, error)}
            style={SmallInputStyle}
            required
          />
          <Button>ENTER</Button>
        </form>

      </TopRight>
      */}


      <img
        src={require('./logo.svg')}
        style={{
          marginTop: '-50px',
          marginBottom: '40px',
          width: '70px'
        }}
        className="vhs-blur"
      />
      <FormBox className="vhs-blur">
        <FormBoxHeader>
          Dashboard
        </FormBoxHeader>
        <FormBoxBody>
          <form onSubmit={() => console.log('submited')}>
            <Input
              type='text'
              value=''
              placeholder='Restaurant Name'
              onChange={(data, error) => console.log('change', data, error)}
              onMount={(data,error) => console.log('mount', data, error)}
              style={InputStyle}
              required
            />
            <Input
              type='password'
              value=''
              placeholder='Password'
              onChange={(data, error) => console.log('change', data, error)}
              onMount={(data,error) => console.log('mount', data, error)}
              style={InputStyle}
              required
            />
            <FormBoxSubmit>ENTER</FormBoxSubmit>
          </form>
        </FormBoxBody>
      </FormBox>
  </Content>);

export default connect(
  state => ({}),
  {},
)(Login);
