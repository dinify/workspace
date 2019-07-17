/* eslint-disable */
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { withStyles, MuiThemeProvider } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
// @material-ui/icons
import Copyright from "@material-ui/icons/CopyrightTwoTone";
import Favorite from "@material-ui/icons/FavoriteTwoTone";

import FacebookBox from "@dinify/common/dist/icons/FacebookBox";
import Instagram from "@dinify/common/dist/icons/Instagram";
import Twitter from "@dinify/common/dist/icons/Twitter";
import Youtube from "@dinify/common/dist/icons/Youtube";
import Github from "@dinify/common/dist/icons/Github";

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

  const verticalDividerStyle = {
    content: '""',
    width: 1,
    height: 24,
    backgroundColor: darkTheme.palette.divider,
    marginLeft: 16,
    marginRight: 16
  };

  const flexCenterStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const socialLinks = [
    {
      link: 'http://www.facebook.com/dinifyapp',
      component: <FacebookBox />
    },
    {
      link: 'http://www.instagram.com/dinifyapp',
      component: <Instagram />
    },
    {
      link: 'http://twitter.com/dinifyapp',
      component: <Twitter />
    },
    {
      link: 'https://github.com/dinify',
      component: <Github />
    },
    {
      link: 'https://www.youtube.com/channel/UCARTi0PRcbWMskKRf7A9REg',
      component: <Youtube />
    }
  ];

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
        <div style={{
          color: darkTheme.palette.text.secondary,
          marginBottom: 32,
          ...flexCenterStyle
        }}>
          {socialLinks.map((social, index) => (
            <React.Fragment key={social.link}>
              {index !== 0 && <div style={verticalDividerStyle}/>}
              <Link href={social.link} color="inherit" style={flexCenterStyle}>
                {social.component}
              </Link>
            </React.Fragment>
          ))}

        </div>
        <Typography variant="caption" color="textSecondary">
          <Trans i18nKey="footer.copyright">
            <Copyright className={classes.smallCopyright} />
            {`${1900 + new Date().getYear()}`}
            <Favorite className={classes.smallHeart}/>
            <Link href="/" color="inherit" />
          </Trans>
        </Typography>
        <div className={classes.clearFix} />
      </div>
    </footer>
  );
}

const WithStyles = withStyles(footerStyle)(Footer);

const WrappedSection = ({...props}) => (
  <MuiThemeProvider theme={darkTheme}>
    <WithStyles {...props}/>
  </MuiThemeProvider>
);

export default WrappedSection;



// WEBPACK FOOTER //
// ./src/components/Footer/Footer.jsx
