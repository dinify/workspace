import React from 'react';
import { connect } from 'react-redux';
import { getT } from '@dinify/common/src/lib/translation.ts';
import { getDefaultLanguage } from 'features/restaurant/selectors';

const Translation = ({ object, defaultLang }) => {
  return (
    <>
      {getT(object.translations, defaultLang)}
    </>
  )
}

export default connect(
  state => ({
    defaultLang: getDefaultLanguage(state)
  })
)(Translation);