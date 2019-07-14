import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";

// core components
import Typography from "@material-ui/core/Typography";

import productStyle from "styles/productStyle.jsx";

const SectionStatement = ({t, classes, ...otherProps}) => {
  return (
    <div id="statement" className={classNames(classes.themedBg, classes.wrapper)}
      style={{ textAlign: "center" }}
      {...otherProps}>
      <div
        className={classNames(
          classes.section,
          classes.sectionDark,
          classes.container
        )}
      >
        <img style={{maxWidth: '100%', maxHeight: 694 / 2, marginBottom: 32}} alt="App in multiple languages" src="https://lh3.googleusercontent.com/ka6Cz1qPgsYNHTY3ehVm9QMOALAzRKuqMbRztdBJlZ_mCGxmoD77IOm3-Oo7ps4EW9r3E3NIion1G2k=s0" />
        <Typography variant="h5">
          {t('restaurantsPage.sections.statement.title')}
        </Typography>
      </div>
    </div>
  );
};

export default withStyles(productStyle)(SectionStatement);
