import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";

// @material-ui/icons
import Typography from "@material-ui/core/Typography";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import CenterFocusStrong from "@material-ui/icons/CenterFocusStrongRounded";
import ViewList from "@material-ui/icons/ViewList";
import RestaurantMenu from "@material-ui/icons/RestaurantMenuRounded";
import LocalCafe from "@material-ui/icons/LocalCafeRounded";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";

import productStyle from "./productStyle.jsx";

const SectionProduct = ({
  classes, t
}) => {
    const steps = [
      {
        icon: <CenterFocusStrong />,
        title: t('sectionProduct.step1.title'),
        description: t('sectionProduct.step1.description')
      },
      {
        icon: <RestaurantMenu />,
        title: t('sectionProduct.step2.title'),
        description: t('sectionProduct.step2.description')
      },
      {
        icon: <LocalCafe />,
        title: t('sectionProduct.step3.title'),
        description: t('sectionProduct.step3.description')
      }
    ];

    return (
      <div id="howitworks" className={classNames(classes.themedBg, classes.wrapper)}>
        <div
          className={classNames(
            classes.section,
            classes.sectionDark,
            classes.container
          )}
        >
          <div>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8}>
                <Typography variant="h3">{t('sectionProduct.header')}</Typography>
                <Typography variant="subtitle1" style={{ marginTop: 8, marginBottom: 56 }}>
                  {t('sectionProduct.subtitle')}
                </Typography>
              </GridItem>
            </GridContainer>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8}>
                <List className={classes.root}>
                  {steps.map(step => {
                    return (
                      <ListItem
                        disableGutters
                        alignItems="flex-start"
                        key={step.title.split(" ").join("-")}
                        style={{ marginBottom: 16 }}
                      >
                        <Avatar
                          style={{
                            width: 72,
                            height: 72,
                            background: "#ffffff",
                            border: '1px solid rgba(0, 0, 0, 0.12)',
                            color: "#c13939"
                          }}
                        >
                          {step.icon}
                        </Avatar>
                        <ListItemText
                          primary={step.title}
                          secondary={step.description}
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    );

}

export default withStyles(productStyle)(SectionProduct);
