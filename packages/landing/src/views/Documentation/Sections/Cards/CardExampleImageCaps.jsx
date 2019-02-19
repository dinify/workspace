import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui icons
// core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

import imagesStyles from "assets/jss/material-kit-pro-react/imagesStyles.jsx";

import { cardTitle } from "assets/jss/material-kit-pro-react.jsx";

const style = {
  ...imagesStyles,
  cardTitle,
  textMuted: {
    color: "#6c757d"
  }
};

class CardExampleImageCaps extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Card>
          <img
            className={classes.imgCardTop}
            src="https://images.unsplash.com/photo-1517303650219-83c8b1788c4c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bd4c162d27ea317ff8c67255e955e3c8&auto=format&fit=crop&w=2691&q=80"
            alt="Card-img-cap"
          />
          <CardBody>
            <h4 className={classes.cardTitle}>Card title</h4>
            <p>
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
            <p>
              <small className={classes.textMuted}>
                Last updated 3 mins ago
              </small>
            </p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <h4 className={classes.cardTitle}>Card title</h4>
            <p>
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
            <p>
              <small className={classes.textMuted}>
                Last updated 3 mins ago
              </small>
            </p>
          </CardBody>
          <img
            className={classes.imgCardBottom}
            src="https://images.unsplash.com/photo-1517303650219-83c8b1788c4c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bd4c162d27ea317ff8c67255e955e3c8&auto=format&fit=crop&w=2691&q=80"
            alt="Card-img-cap"
          />
        </Card>
      </div>
    );
  }
}

export default withStyles(style)(CardExampleImageCaps);
