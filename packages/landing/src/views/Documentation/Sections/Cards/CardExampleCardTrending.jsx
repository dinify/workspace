import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui icons
import Favorite from "@material-ui/icons/Favorite";
import ChatBubble from "@material-ui/icons/ChatBubble";
// core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Danger from "components/Typography/Danger.jsx";

import christian from "assets/img/faces/christian.jpg";

import cardsStyle from "assets/jss/material-kit-pro-react/views/componentsSections/sectionCards.jsx";

const style = {
  ...cardsStyle
};

class CardExampleCardTrending extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Card>
        <CardBody>
          <Danger>
            <h6 className={classes.cardCategory}>TRENDING</h6>
          </Danger>
          <h4 className={classes.cardTitle}>
            <a href="#pablo" onClick={e => e.preventDefault()}>
              To Grow Your Business Start Focusing on Your Employees
            </a>
          </h4>
        </CardBody>
        <CardFooter>
          <div className={classes.author}>
            <a href="#pablo" onClick={e => e.preventDefault()}>
              <img
                src={christian}
                alt="..."
                className={`${classes.imgRaised} ${classes.avatar}`}
              />
              <span>Lord Alex</span>
            </a>
          </div>
          <div className={`${classes.stats} ${classes.mlAuto}`}>
            <Favorite />
            345 ·
            <ChatBubble />
            45
          </div>
        </CardFooter>
      </Card>
    );
  }
}

export default withStyles(style)(CardExampleCardTrending);
