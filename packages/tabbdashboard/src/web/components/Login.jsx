// @flow
import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import type { Error } from '../../flow'
import { Link } from 'react-router-dom';

import { Form, Text } from 'react-form'
import { getJoke, isSearchLoading, getLastError } from '../../selectors/viewer';

import { loginInitAction } from '../../ducks/restaurant'

import { HorizontalLine } from './styled/HorizontalLine'

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
  text-align: center;
  a {
    color: rgba(255,255,255,0.6);
    font-size: 12px;
    &:hover {
      color: white;
    }
  }
`;

const TextInput = styled(Text)`
  background-color: rgba(255,255,255,0.2);
  margin: 10px 0 0 0;
  outline: none;
  padding: 10px 15px;
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 5px;
  color: white;
  width: 250px;
  &:focus {
    border-color: rgba(255,255,255,0.4);
  }
`;

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
  doLogin: typeof loginInitAction,
};

const TopRight = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 600px;
`;


const Login = ({ lastError, doLogin }: LoginProps) =>
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

          <Form
            onSubmit={({ email, password }) => {
              console.log('Success!', { email, password });
              doLogin({ email, password });
            }}
            validate={({ email, password }) => {
              return {
                email: !email ? 'Emal is required' : undefined,
                password: !password ? 'Password is required' : undefined
              }
            }}
          >
            {({submitForm}) => {
              return (
                <form onSubmit={submitForm}>
                  <TextInput field="email" placeholder="Email" />
                  <TextInput field="password" type="password" placeholder="Password" />
                  <FormBoxSubmit>ENTER</FormBoxSubmit>
                  <HorizontalLine mt={20} mb={20} />
                  <Link to="/signup">Not using TABB yet? Sign Up here!</Link>
                </form>
              )
            }}
          </Form>

        </FormBoxBody>
      </FormBox>
  </Content>);

export default connect(
  state => ({
    joke: getJoke(state),
    isLoading: isSearchLoading(state),
    lastError: getLastError(state),
  }),
  {
    doLogin: loginInitAction,
  },
)(Login);
