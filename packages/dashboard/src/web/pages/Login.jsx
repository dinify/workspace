// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Form, Text } from 'react-form';
import { loginInitAction } from 'ducks/restaurantLegacy';
import { HorizontalLine } from 'web/components/styled/HorizontalLine';
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

const Login = ({ doLogin, progressMap, errorsMap }) => (
  <Content>
    <img
      alt="TABB"
      src={require('assets/img/logo.svg')}
      style={{
        marginTop: '-50px',
        marginBottom: '40px',
        width: '70px',
      }}
      className="vhs-blur"
    />
    <FormBox className="vhs-blur">
      <FormBoxHeader>Dashboard</FormBoxHeader>
      <FormBoxBody>
        <Form
          onSubmit={({ email, password }) => {
            console.log('Success!', { email, password });
            doLogin({ email, password });
          }}
          validate={({ email, password }) => {
            return {
              email: !email ? 'Emal is required' : undefined,
              password: !password ? 'Password is required' : undefined,
            };
          }}
        >
          {({ submitForm }) => {
            return (
              <form onSubmit={submitForm}>
                <TextInput field="email" placeholder="Email" />
                <TextInput
                  field="password"
                  type="password"
                  placeholder="Password"
                />
                <FormBoxSubmit>ENTER</FormBoxSubmit>
                <ErrorMessage>
                  {progressMap.LOGIN === 'ERROR' ? (
                    <div>Wrong e-mail or password</div>
                  ) : (
                    ''
                  )}
                </ErrorMessage>
                <HorizontalLine mt={20} mb={20} />
                <Link to="/signup">Not using Dinify yet? Sign Up here!</Link>
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
    doLogin: loginInitAction,
  },
)(Login);
