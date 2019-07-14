/* eslint-disable */
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { withStyles, MuiThemeProvider } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
// @material-ui/icons
import Copyright from "@material-ui/icons/CopyrightTwoTone";
import Favorite from "@material-ui/icons/FavoriteTwoTone";
import { Trans, useTranslation } from 'react-i18next';

import footerStyle from "styles/material-kit-pro-react/components/footerStyle.jsx";
import getTheme from "@dinify/common/dist/theme";

const darkTheme = getTheme({ type: "dark" });

const Footer = (props) => {
  const { t } = useTranslation();
  const { children, content, classes, theme, big, className } = props;
  const themeType =
    theme === "transparent" || theme == undefined ? false : true;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes[theme]]: themeType,
    [classes.big]: big || children !== undefined,
    [className]: className !== undefined
  });
  const aClasses = classNames({
    [classes.a]: true
  });

  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        {children !== undefined ? (
          <div>
            <div className={classes.content}>{children}</div>
            <hr />
          </div>
        ) : (
          " "
        )}
        {content}
        <Typography variant="caption" color="textSecondary">
          <Trans i18nKey="footer.copyright">
            <Copyright className={classes.smallCopyright} />
            {1900 + new Date().getYear()}
            <Favorite className={classes.smallHeart}/>
            <a className={classes.textSecondary} href="https://www.dinify.app/"/>
          </Trans>
        </Typography>
        <div className={classes.clearFix} />
      </div>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.oneOf(["dark", "white", "transparent"]),
  big: PropTypes.bool,
  content: PropTypes.node.isRequired
};

const WithStyles = withStyles(footerStyle)(Footer);

const WrappedSection = ({...props}) => (
  <MuiThemeProvider theme={darkTheme}>
    <WithStyles {...props}/>
  </MuiThemeProvider>
);

export default WrappedSection;



// WEBPACK FOOTER //
// ./src/components/Footer/Footer.jsx
