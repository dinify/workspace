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
`;


type LoginProps = {
  lastError: Error,
};


const Settings = ({ lastError }: LoginProps) =>
  (<Content>
  </Content>);

export default connect(
  state => ({}),
  {},
)(Settings);
