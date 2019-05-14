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

const steps = [
  {
    icon: <CenterFocusStrong />,
    title: "Scan code",
    description: "Get started by scanning the QR code in a restaurant near you to check in and open their menu."
  },
  {
    icon: <RestaurantMenu />,
    title: "Browse and order",
    description: "To avoid bad surprises, you can always read the menu in your own language. Customize your order to your liking."
  },
  {
    icon: <LocalCafe />,
    title: "Streamline",
    description: "Control your experience, forget interruptions. No matter what you need, it's just one tap away."
  }
];

class SectionProduct extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div id="steps" className={classNames(classes.themedBg, classes.wrapper)}>
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
                <Typography variant="h3">How it works</Typography>
                <Typography variant="subtitle1" style={{ marginTop: 8, marginBottom: 56 }}>
                  We simplified the process to so it's easy to get started. You do not need to download or install anything on your phone.
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
}

export default withStyles(productStyle)(SectionProduct);
