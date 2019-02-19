import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui icons
import Subject from "@material-ui/icons/Subject";
import WatchLater from "@material-ui/icons/WatchLater";
// core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";

import cardsStyle from "assets/jss/material-kit-pro-react/views/componentsSections/sectionCards.jsx";

const style = {
  ...cardsStyle
};

class CardExampleCardBackground extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Card
        background
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=750&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D)`
        }}
      >
        <CardBody background>
          <h6 className={classes.cardCategoryWhite}>PRODUCTIVITY APPS</h6>
          <a href="#pablo" onClick={e => e.preventDefault()}>
            <h3 className={classes.cardTitleWhite}>
              The Best Productivity Apps on Market
            </h3>
          </a>
          <p className={classes.cardDescriptionWhite}>
            Don't be scared of the truth because we need to restart the human
            foundation in truth And I love you like Kanye loves Kanye I love
            Rick Owens’ bed design but the back is...
          </p>
          <Button simple color="white">
            <Subject /> Read Article
          </Button>
          <Button simple color="white">
            <WatchLater /> Watch Later
          </Button>
        </CardBody>
      </Card>
    );
  }
}

export default withStyles(style)(CardExampleCardBackground);
