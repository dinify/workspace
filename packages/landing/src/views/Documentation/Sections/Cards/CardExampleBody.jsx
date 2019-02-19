import React from "react";
// @material-ui/core components
// @material-ui icons
// core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

class CardExampleBody extends React.Component {
  render() {
    return (
      <Card>
        <CardBody>This is some text within a card body.</CardBody>
      </Card>
    );
  }
}

export default CardExampleBody;
