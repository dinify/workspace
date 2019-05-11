import React, { Component } from "react";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import PhoneFrame from "./PhoneFrame";
import Favorite from "@material-ui/icons/FavoriteRounded";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import { supportsWebp } from "@dinify/common/dist/lib/FN";

import translations from "../translations.json";

const descriptionEn = "Rolled seasoned rice in thin sea sweed sheet with a variety of inserts - yellow radish, egg, cucumber, carrots, sesame oil and sesame seeds. There are three varieties depending on the main ingredients : beef, tuna or kimchi. 2 Rolls per order.";

const styles = theme => ({
  mainImage: {
    width: "100%"
  },
  smallIcon: {
    marginRight: 16,
    fontSize: 16,
    color: theme.palette.primary.main
  },
  themedBg: {
    backgroundColor: theme.palette.background.default
  }
});

class PhoneRestaurantMenu extends Component {
  state = {
    webpSupported: false
  };

  componentDidMount() {
    supportsWebp().then(supported => {
      this.setState({ webpSupported: supported });
    });
  }

  render() {
    const { classes, selected } = this.props;
    const { webpSupported } = this.state;
    return (
      <PhoneFrame>
        <img
          className={classes.mainImage}
          alt="Food on the menu"
          src={`https://storage.googleapis.com/static.dinify.app/landing/menu-item-burger.${
            webpSupported ? "webp" : "jpg"
          }`}
        />
        <div className={classes.themedBg} style={{ height: "100%" }}>
          <List disablePadding>
            <ListItem>
              <ListItemText
                primary="House Burger"
                secondary="580 Kč"
                primaryTypographyProps={{ variant: "subtitle1" }}
                secondaryTypographyProps={{ variant: "body2" }}
              />
              <ListItemSecondaryAction>
                <Favorite className={classes.smallIcon}/>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
          <div style={{ paddingLeft: 16, paddingRight: 16, textAlign: "left" }}>
            <Typography variant="caption">
              {translations[selected] || descriptionEn}
            </Typography>
            <Divider style={{ marginTop: 16, marginBottom: 16 }}/>
            <div>
              <Typography
                variant="overline"
                color="textSecondary"
                style={{ transform: "scale(0.75)", transformOrigin: "center left", marginBottom: 8 }}
              >
                Nutrition facts
              </Typography>
              {[
                ["Fats", "0.2 g"],
                ["Carbs", "0.2 g"],
                ["Proteins", "0.2 g"],
                ["Calories", "150 Kcal"]
              ].map((params, i) => (
                <div key={`nutr-${i}`} style={{ display: "flex" }}>
                  <Typography variant="caption" style={{ flex: 1}}>
                    {params[0]}
                  </Typography>
                  <Typography variant="caption">
                    {params[1]}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PhoneFrame>
    );
  }
}

export default withStyles(styles)(PhoneRestaurantMenu);
