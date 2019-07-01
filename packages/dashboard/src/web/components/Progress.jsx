import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Icon = styled.i`
  font-size: 18px;
  vertical-align: middle;
  float: right;
  position: relative;
  top: -2px;
  margin: 5px;
  &.pending {
    color: rgb(52, 152, 219);
    -webkit-animation: spin 0.5s linear infinite;
    -moz-animation: spin 0.5s linear infinite;
    animation: spin 0.5s linear infinite;
  }
  &.success {
    color: rgb(46, 204, 113);
  }
  &.error {
    color: rgb(231, 76, 60);
  }
`;

const Progress = ({ stages, type }) => {
  if (!type) return <span />;
  if (!stages[type]) return <span />;
  const stage = stages[type];
  if (stage === 'PENDING')
    return <Icon className="pending ion-load-a" title="Pending" />;
  if (stage === 'SUCCESS')
    return <Icon className="success ion-checkmark-circled" title="Success" />;
  if (stage === 'ERROR')
    return <Icon className="error ion-android-alert" title="Error" />;
};

export default connect(state => ({
  stages: state.ui.progressMap,
}))(Progress);
