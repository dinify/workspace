import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui icons
// core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";

import { cardTitle } from "assets/jss/material-kit-pro-react.jsx";

const style = {
  cardTitle,
  textCenter: {
    textAlign: "center"
  },
  textRight: {
    textAlign: "right"
  }
};

class CardExampleTextAlignment extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Card style={{ width: "20rem" }}>
          <CardBody>
            <h4 className={classes.cardTitle}>Special title treatment</h4>
            <p>
              With supporting text below as a natural lead-in to additional
              content.
            </p>
            <Button color="primary">Do something</Button>
          </CardBody>
        </Card>
        <Card className={classes.textCenter} style={{ width: "20rem" }}>
          <CardBody>
            <h4 className={classes.cardTitle}>Special title treatment</h4>
            <p>
              With supporting text below as a natural lead-in to additional
              content.
            </p>
            <Button color="primary">Do something</Button>
          </CardBody>
        </Card>
        <Card className={classes.textRight} style={{ width: "20rem" }}>
          <CardBody>
            <h4 className={classes.cardTitle}>Special title treatment</h4>
            <p>
              With supporting text below as a natural lead-in to additional
              content.
            </p>
            <Button color="primary">Do something</Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default withStyles(style)(CardExampleTextAlignment);
