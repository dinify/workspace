// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Form, Text } from 'react-form';
import { signupInitAction } from 'ducks/restaurantLegacy';
import ErrorMessage from 'web/components/ErrorMessage';

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
  background-color: rgb(34, 44, 60);
  width: 280px;
`;

const FormBoxHeader = styled.div`
  background: rgba(0, 0, 0, 0.1);
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
    color: rgba(255, 255, 255, 0.6);
    font-size: 12px;
    &:hover {
      color: white;
    }
  }
`;

const TextInput = styled(Text)`
  background-color: rgba(255, 255, 255, 0.2);
  margin: 10px 0 0 0;
  outline: none;
  padding: 10px 15px;
  border: none;
  color: white;
  width: 250px;
  &:focus {
    border-color: rgba(255, 255, 255, 0.4);
  }
`;

const FormBoxSubmit = styled.button`
  background-color: rgb(38, 156, 244);
  margin: 20px 0 0 0;
  outline: none;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  color: white;
  width: 250px;
  &:hover {
    background-color: rgb(28, 146, 234);
  }
  &:active {
    background-color: rgb(18, 126, 214);
    border-color: transparent;
  }
`;

type LoginProps = {
  lastError: Error,
  doSignup: typeof signupInitAction,
};

const Signup = ({
  lastError,
  doSignup,
  progressMap,
  errorsMap,
}: LoginProps) => (
  <Content>
    <img
      src={require('assets/img/logo.svg')}
      alt="TABB"
      style={{
        marginTop: '-50px',
        marginBottom: '40px',
        width: '70px',
      }}
      className="vhs-blur"
    />
    <FormBox className="vhs-blur">
      <FormBoxHeader>Registration</FormBoxHeader>
      <FormBoxBody>
        <Form
          onSubmit={form => {
            doSignup(form);
          }}
          validate={({
            name,
            phone,
            email,
            password,
            restaurantName,
            subdomain,
          }) => {
            return {
              name: !name ? 'Your name is required' : undefined,
              phone: !phone ? 'Your phone is required' : undefined,
              email: !email ? 'Email is required' : undefined,
              password: !password ? 'Password is required' : undefined,
              restaurantName: !name ? 'Restaurant Name is required' : undefined,
              subdomain: !subdomain ? 'Subdomain is required' : undefined,
            };
          }}
        >
          {({ submitForm }) => {
            return (
              <form onSubmit={submitForm}>
                <TextInput field="name" placeholder="Your Name" />
                <TextInput field="phone" placeholder="Phone Number" />
                <TextInput field="email" placeholder="Your Email" />
                <TextInput
                  field="password"
                  type="password"
                  placeholder="Password"
                />

                <TextInput
                  field="restaurantName"
                  placeholder="Restaurant Name"
                />
                <TextInput field="subdomain" placeholder="Subdomain" />

                <FormBoxSubmit>SIGN UP</FormBoxSubmit>

                <ErrorMessage>
                  {progressMap.LOGIN === 'ERROR' ? <div>Login failed</div> : ''}
                  {progressMap.SIGNUP === 'ERROR' ? (
                    <div>Registration failed</div>
                  ) : (
                    ''
                  )}
                  {errorsMap.SIGNUP ? <div>{errorsMap.SIGNUP}</div> : ''}
                </ErrorMessage>
              </form>
            );
          }}
        </Form>
      </FormBoxBody>
    </FormBox>
  </Content>
);

export default connect(
  state => ({
    progressMap: state.ui.progressMap,
    errorsMap: state.ui.errorsMap,
  }),
  {
    doSignup: signupInitAction,
  },
)(Signup);
