import React from "react";

// @material-ui/core components
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
// @material-ui icons
// core components
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

class CardExampleListGroupsHeader extends React.Component {
  render() {
    return (
      <Card style={{ width: "20rem" }}>
        <CardHeader color="danger">Featured</CardHeader>
        <List component="nav">
          <ListItem>
            <ListItemText primary="Cras justo odio" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Dapibus ac facilisis in" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Vestibulum at eros" />
          </ListItem>
        </List>
      </Card>
    );
  }
}

export default CardExampleListGroupsHeader;
