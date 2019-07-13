import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Typography from "@material-ui/core/Typography";

import productStyle from "styles/productStyle.jsx";

const SectionStatement = ({t, classes, ...otherProps}) => {
  return (
    <div id="howitworks" className={classNames(classes.themedBg, classes.wrapper)}
      style={{ textAlign: "center" }}
      {...otherProps}>
      <div
        className={classNames(
          classes.section,
          classes.sectionDark,
          classes.container
        )}
      >
        <img style={{maxWidth: '100%', maxHeight: 694 / 2, marginBottom: 32}} alt="App in multiple languages" src="https://storage.googleapis.com/static.dinify.app/landing/app-multilanguage.png" />
        <Typography variant="h4">
          {t('restaurantsPage.sections.statement.title')}
        </Typography>
      </div>
    </div>
  );
};

export default withStyles(productStyle)(SectionStatement);
