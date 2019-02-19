import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui icons
import Business from "@material-ui/icons/Business";
// core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";

import cardsStyle from "assets/jss/material-kit-pro-react/views/componentsSections/sectionCards.jsx";

const style = {
  ...cardsStyle
};

class CardExampleCardPricing extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Card pricing color="primary" style={{ maxWidth: "235px" }}>
        <CardBody pricing>
          <div className={`${classes.iconWrapper} ${classes.iconWrapperColor}`}>
            <Business className={classes.iconWhite} />
          </div>
          <h3 className={`${classes.cardTitleWhite} ${classes.marginTop30}`}>
            $69
          </h3>
          <p className={classes.cardDescriptionWhite}>
            This is good if your company size is between 11 and 99 Persons.
          </p>
          <Button round color="white">
            Choose plan
          </Button>
        </CardBody>
      </Card>
    );
  }
}

export default withStyles(style)(CardExampleCardPricing);
