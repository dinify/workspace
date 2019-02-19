import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui icons
// core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Button from "components/CustomButtons/Button.jsx";

import cardsStyle from "assets/jss/material-kit-pro-react/views/componentsSections/sectionCards.jsx";

const style = {
  ...cardsStyle
};

class CardExampleCardProfile extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Card profile style={{ maxWidth: "360px" }}>
        <CardHeader image>
          <a href="#pablo" onClick={e => e.preventDefault()}>
            <img
              src="https://images.unsplash.com/photo-1492447273231-0f8fecec1e3a?auto=format&fit=crop&w=334&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"
              alt="..."
            />
          </a>
          <div
            className={classes.coloredShadow}
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1492447273231-0f8fecec1e3a?auto=format&fit=crop&w=334&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D)`,
              opacity: "1"
            }}
          />
        </CardHeader>
        <CardBody>
          <h4 className={classes.cardTitle}>Alec Thompson</h4>
          <h6 className={`${classes.cardCategory} ${classes.cardDescription}`}>
            CEO / CO-FOUNDER
          </h6>
        </CardBody>
        <CardFooter profile className={classes.justifyContentCenter}>
          <Button justIcon round color="twitter">
            <i className="fab fa-twitter" />
          </Button>
          <Button justIcon round color="facebook">
            <i className="fab fa-facebook" />
          </Button>
          <Button justIcon round color="google">
            <i className="fab fa-google" />
          </Button>
        </CardFooter>
      </Card>
    );
  }
}

export default withStyles(style)(CardExampleCardProfile);
