import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui icons
// core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

import imagesStyles from "assets/jss/material-kit-pro-react/imagesStyles.jsx";

const style = {
  ...imagesStyles
};

class CardExampleImages extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Card style={{ width: "20rem" }}>
        <img
          style={{ height: "180px", width: "100%", display: "block" }}
          className={classes.imgCardTop}
          src="https://images.unsplash.com/photo-1517303650219-83c8b1788c4c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bd4c162d27ea317ff8c67255e955e3c8&auto=format&fit=crop&w=2691&q=80"
          alt="Card-img-cap"
        />
        <CardBody>
          <p>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </CardBody>
      </Card>
    );
  }
}

export default withStyles(style)(CardExampleImages);
