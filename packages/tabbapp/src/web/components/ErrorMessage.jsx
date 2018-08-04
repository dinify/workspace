import React from 'react';
import { connect } from 'react-redux';

const ErrorMessage = ({ actionType, errorsMap }) => {
  return (
    <div>
      {errorsMap[actionType]}
    </div>
  );
};

export default connect(
  state => ({
    errorsMap: state.ui.errorsMap
  })
)(ErrorMessage);
