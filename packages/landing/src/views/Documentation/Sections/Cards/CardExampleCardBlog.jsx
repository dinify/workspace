import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui icons
// core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Info from "components/Typography/Info.jsx";

import imagesStyles from "assets/jss/material-kit-pro-react/imagesStyles.jsx";
import cardsStyle from "assets/jss/material-kit-pro-react/views/componentsSections/sectionCards.jsx";

import { cardTitle } from "assets/jss/material-kit-pro-react.jsx";

const style = {
  ...imagesStyles,
  ...cardsStyle,
  cardTitle
};

class CardExampleCardBlog extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Card blog>
        <CardHeader image>
          <a href="#pablo">
            <img
              className={classes.imgCard}
              src="https://images.unsplash.com/photo-1511439817358-bee8e21790b5?auto=format&fit=crop&w=750&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"
              alt=""
            />
            <div className={classes.imgCardOverlay}>
              <h4
                className={classes.cardTitle}
                style={{
                  color: "white",
                  position: "absolute",
                  bottom: "10px",
                  left: "15px"
                }}
              >
                This Summer Will be Awesome
              </h4>
            </div>
          </a>
        </CardHeader>
        <CardBody>
          <Info>
            <h6 className={classes.cardCategory}>Fashion</h6>
          </Info>
          <p>
            Don't be scared of the truth because we need to restart the human
            foundation in truth And I love you like Kanye loves Kanye I love
            Rick Owens’ bed design but the back is...
          </p>
        </CardBody>
      </Card>
    );
  }
}

export default withStyles(style)(CardExampleCardBlog);
