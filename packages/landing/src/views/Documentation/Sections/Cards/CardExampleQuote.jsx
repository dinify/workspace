import React from "react";
// @material-ui/core components
// @material-ui icons
// core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Quote from "components/Typography/Quote.jsx";

class CardExampleQuote extends React.Component {
  render() {
    return (
      <Card>
        <CardHeader color="success">Quote</CardHeader>
        <CardBody>
          <Quote
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante."
            author="Someone famous in Source Title"
          />
        </CardBody>
      </Card>
    );
  }
}

export default CardExampleQuote;
