// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import type { Error } from '../../flow';
import { Link } from 'react-router-dom';

const Header = styled.div`
  position: fixed;
  left: 240px;
  top: 0;
  height: 60px;
  width: calc(100% - 240px);
  background: #FFF;
  line-height: 60px;
  padding-left: 30px;
`;

type LoginProps = {
  lastError: Error,
};

const Guests = ({ lastError }: LoginProps) =>
  (<div>
    <Header>
      Guests
    </Header>
  </div>);

export default connect(
  state => ({}),
  {},
)(Guests);
