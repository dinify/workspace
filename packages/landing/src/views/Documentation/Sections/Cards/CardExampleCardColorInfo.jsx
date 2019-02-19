import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui icons
import Favorite from "@material-ui/icons/Favorite";
import Share from "@material-ui/icons/Share";
// core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import avatar from "assets/img/faces/avatar.jpg";

import cardsStyle from "assets/jss/material-kit-pro-react/views/componentsSections/sectionCards.jsx";

const style = {
  ...cardsStyle
};

class CardExampleCardColorInfo extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Card color="info">
        <CardBody color>
          <h5 className={classes.cardCategorySocialWhite}>
            <i className="fab fa-twitter" />
            Twitter
          </h5>
          <h4 className={classes.cardTitleWhite}>
            <a href="#pablo" onClick={e => e.preventDefault()}>
              "You Don't Have to Sacrifice Joy to Build a Fabulous Business and
              Life"
            </a>
          </h4>
        </CardBody>
        <CardFooter>
          <div className={classes.authorWhite}>
            <a href="#pablo" onClick={e => e.preventDefault()}>
              <img
                src={avatar}
                alt="..."
                className={`${classes.imgRaised} ${classes.avatar}`}
              />
              <span>Tania Andrew</span>
            </a>
          </div>
          <div className={`${classes.statsWhite} ${classes.mlAuto}`}>
            <Favorite />
            2.4K ·
            <Share />
            45
          </div>
        </CardFooter>
      </Card>
    );
  }
}

export default withStyles(style)(CardExampleCardColorInfo);
