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
  doSignup: typeof signupInitAction,
};

const TopRight = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 600px;
`;


const Signup = ({ lastError, doSignup }: LoginProps) =>
  (<Content>
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
          Sign up your restaurant
        </FormBoxHeader>
        <FormBoxBody>

          <Form
            onSubmit={({ email, password, restaurantName, nameInCharge, mobile }) => {
              console.log('Success!', { email, password, restaurantName, nameInCharge, mobile });
              doSignup({ email, password, restaurantName, nameInCharge, mobile });
            }}
            validate={({ email, password, restaurantName, nameInCharge, mobile }) => {
              return {
                email: !email ? 'Name is required' : undefined,
                password: !password ? 'Password is required' : undefined,

                restaurantName: !restaurantName ? 'Restaurant Name is required' : undefined,
                nameInCharge: !nameInCharge ? 'Password is required' : undefined,
                mobileNumber: !mobile ? 'Mobile number is required' : undefined,
              }
            }}
          >
            {({submitForm}) =>  {
              return (
                <form onSubmit={submitForm}>
                  <TextInput field='email' placeholder='Email address' />
                  <TextInput field='password' type="password" placeholder='Password' />

                  <HorizontalLine />

                  <TextInput field='restaurantName' placeholder='Restaurant Name' />
                  <TextInput field='nameInCharge' placeholder='Name in charge' />
                  <TextInput field='mobile' placeholder='Mobile number' />

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
