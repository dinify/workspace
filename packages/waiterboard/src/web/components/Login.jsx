// @flow
import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import type { Error } from '../../flow'

import { Form, Text } from 'react-form'
import { loginInitAction } from 'ducks/restaurant/actions'
import { FormBox, FormBoxHead, FormBoxBody, FormBoxSubmit } from './styled/FormBox'

const Content = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

type LoginProps = {
  lastError: Error,
  doLogin: typeof loginInitAction,
};

const Login = ({ lastError, doLogin }: LoginProps) =>
  (<Content>
      <img
        alt='TABB'
        src="http://images.tabb.global/brand/logo.svg"
        style={{
          marginTop: '-50px',
          marginBottom: '40px',
          width: '70px'
        }}
        className="vhs-blur"
      />
      <FormBox className="vhs-blur">
        <FormBoxHead>
          Waiterboard
        </FormBoxHead>
        <FormBoxBody>

          <Form
            onSubmit={({ email, password }) => {
              doLogin({ email, password });
            }}
            validate={({ email, password }) => {
              return {
                email: !email ? 'Email is required' : undefined,
                password: !password ? 'Password is required' : undefined
              }
            }}
          >
            {({submitForm}) => {
              return (
                <form onSubmit={submitForm}>
                  <Text field="email" placeholder="Email" />
                  <Text field="password" type="password" placeholder="Password" />
                  <FormBoxSubmit>ENTER</FormBoxSubmit>
                </form>
              )
            }}
          </Form>

        </FormBoxBody>
      </FormBox>
  </Content>);

export default connect(
  state => ({}),
  {
    doLogin: loginInitAction,
  },
)(Login);
