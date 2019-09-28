import React from 'react';
import { connect } from 'react-redux';
import { getT } from '@dinify/common/src/lib/translation.ts';

const Translation = ({ object, defaultLang }) => {
  return (
    <>
      {getT(object.translations, defaultLang)}
    </>
  )
}

export default connect(
  state => ({
    defaultLang: state.restaurant.defaultLanguage
  })
)(Translation);