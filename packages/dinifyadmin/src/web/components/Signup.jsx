// @flow
import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import type { Error } from '../../flow'

import { Form, Text } from 'react-form'

import { signupInitAction } from '../../ducks/restaurant'
import { HorizontalLine } from './styled/HorizontalLine'

const Content = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const FormBox = styled.div`
  color: white;
  background-color: rgb(34,44,60);
  width: 280px;
`;

const FormBoxHeader = styled.div`
  background: rgba(0,0,0,0.1);
  padding: 20px;
  font-size: 16px;
  color: white;
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 2px;
  font-weight: 200;
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
  border: none;
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
  border: none;
  cursor: pointer;
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

type LoginProps = {
  lastError: Error,
  doSignup: typeof signupInitAction,
}


const Signup = ({ lastError, doSignup }: LoginProps) =>
  (<Content>
      <img
        src={require('./logo.svg')}
        alt="TABB"
        style={{
          marginTop: '-50px',
          marginBottom: '40px',
          width: '70px'
        }}
        className="vhs-blur"
      />
      <FormBox className="vhs-blur">
        <FormBoxHeader>
          Registration
        </FormBoxHeader>
        <FormBoxBody>

          <Form
            onSubmit={(form) => {
              doSignup(form);
            }}
            validate={({ email, password, name, subdomain }) => {
              return {
                email: !email ? 'Email is required' : undefined,
                password: !password ? 'Password is required' : undefined,
                name: !name ? 'Restaurant Name is required' : undefined,
                subdomain: !subdomain ? 'Subdomain is required' : undefined,
              }
            }}
          >
            {({submitForm}) =>  {
              return (
                <form onSubmit={submitForm}>

                  <TextInput field='email' placeholder='Your Email' />
                  <TextInput field='password' placeholder='Password' />

                  <TextInput field='name' placeholder='Restaurant Name' />
                  <TextInput field='subdomain' placeholder='Subdomain' />

                  <FormBoxSubmit>SIGN UP</FormBoxSubmit>
                </form>
              )
            }}
          </Form>

        </FormBoxBody>
      </FormBox>
  </Content>);

export default connect(
  state => ({
  }),
  {
    doSignup: signupInitAction,
  },
)(Signup);