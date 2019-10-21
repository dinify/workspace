import React from 'react';
import { withStyles, withTheme } from "@material-ui/core/styles";
import classNames from "classnames";

// core components
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import RestaurantMenu from "@material-ui/icons/RestaurantMenuRounded";
import OpenInNew from "@material-ui/icons/OpenInNewRounded";
import Phone from "@material-ui/icons/PhoneRounded";

import productStyle from "styles/productStyle.jsx";

const key = 'restaurantsPage.sections.pricing';
const SectionPricing = ({t, registrationURL, classes, theme, ...otherProps}) => {
  const flexCenterStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };
  return (
    <div id="pricing" className={classNames(classes.themedBg, classes.wrapper)}
      style={{ textAlign: "center" }}
      {...otherProps}>
      <div
        className={classNames(
          classes.section,
          classes.sectionDark,
          classes.container
        )}
      >
        <RestaurantMenu style={{color: theme.palette.primary.main, marginBottom: 16}}/>
        <Typography variant="h4">
          {t(`${key}.title`)}
        </Typography>
        <Typography variant="subtitle1">
          {t(`${key}.subtitle`)}
        </Typography>
        <div style={{
          marginTop: 56,
          marginBottom: 56
        }}>
          <Typography variant="h5">
            {t(`${key}.price.monthly.amount`)}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {t(`${key}.price.monthly.caption`)}
          </Typography>
        </div>
        <Button
          variant="contained"
          color="primary"
          style={{ height: 48 }}
          href={registrationURL}
          target="_blank"
          rel="noopener noreferrer"
          id="getStartedButton"
        >
          <OpenInNew style={{ marginRight: 8 }}/>
          {t(`${key}.cta`)}
        </Button>
      </div>
    </div>
  );
};

export default withTheme()(withStyles(productStyle)(SectionPricing));
