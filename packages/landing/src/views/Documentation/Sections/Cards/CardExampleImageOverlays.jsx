import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui icons
// core components
import Card from "components/Card/Card.jsx";

import imagesStyles from "assets/jss/material-kit-pro-react/imagesStyles.jsx";

import { cardTitle } from "assets/jss/material-kit-pro-react.jsx";

const style = {
  ...imagesStyles,
  cardTitle
};

class CardExampleImageOverlays extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Card style={{ color: "white" }}>
        <img
          className={classes.imgCard}
          src="https://images.unsplash.com/photo-1517303650219-83c8b1788c4c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bd4c162d27ea317ff8c67255e955e3c8&auto=format&fit=crop&w=2691&q=80"
          alt="Card-img"
        />
        <div className={classes.imgCardOverlay}>
          <h4 className={classes.cardTitle} style={{ color: "white" }}>
            Card title
          </h4>
          <p>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </p>
          <p>Last updated 3 mins ago</p>
        </div>
      </Card>
    );
  }
}

export default withStyles(style)(CardExampleImageOverlays);
