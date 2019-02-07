import React from 'react';
import { connect } from 'react-redux';

const ErrorMessage = ({ actionType, errorsMap, translations }) => {
  let message = '';
  if (errorsMap[actionType]) {
    message = errorsMap[actionType].message;
    if (translations[errorsMap[actionType].code]) {
      message = translations[errorsMap[actionType].code];
    }
  }
  return (
    <span>
      {message}
    </span>
  );
};

export default connect(
  state => ({
    errorsMap: state.ui.errorsMap
  })
)(ErrorMessage);
