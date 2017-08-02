// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import type { Error } from '../../flow';
import { Link } from 'react-router-dom';

const Header = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 60px;
  width: 100%;
  background: #FFF;
`;

type LoginProps = {
  lastError: Error,
};

const Sales = ({ lastError }: LoginProps) =>
  (<div>
    <Header>
      Sales
    </Header>
  </div>);

export default connect(
  state => ({}),
  {},
)(Sales);
