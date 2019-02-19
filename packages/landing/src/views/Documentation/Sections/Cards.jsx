import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter/prism";
import { prism } from "react-syntax-highlighter/styles/prism";
// core components
import Accordion from "components/Accordion/Accordion.jsx";
// code examples
import CardExample from "./Cards/CardExample.jsx";
import CardExampleBody from "./Cards/CardExampleBody.jsx";
import CardExampleTitleTextLinks from "./Cards/CardExampleTitleTextLinks.jsx";
import CardExampleHeaderAndFooter from "./Cards/CardExampleHeaderAndFooter.jsx";
import CardExampleQuote from "./Cards/CardExampleQuote.jsx";
import CardExampleFeatured from "./Cards/CardExampleFeatured.jsx";
import CardExampleTextAlignment from "./Cards/CardExampleTextAlignment.jsx";
import CardExampleImageCaps from "./Cards/CardExampleImageCaps.jsx";
import CardExampleImageOverlays from "./Cards/CardExampleImageOverlays.jsx";
import CardExampleImages from "./Cards/CardExampleImages.jsx";
import CardExampleListGroups from "./Cards/CardExampleListGroups.jsx";
import CardExampleListGroupsHeader from "./Cards/CardExampleListGroupsHeader.jsx";
import CardExampleCardBlog from "./Cards/CardExampleCardBlog.jsx";
import CardExampleCardColorInfo from "./Cards/CardExampleCardColorInfo.jsx";
import CardExampleCardTrending from "./Cards/CardExampleCardTrending.jsx";
import CardExampleCardProfile from "./Cards/CardExampleCardProfile.jsx";
import CardExampleCardBackground from "./Cards/CardExampleCardBackground.jsx";
import CardExampleCardPricing from "./Cards/CardExampleCardPricing.jsx";
import CardExampleCardRotating from "./Cards/CardExampleCardRotating.jsx";

const codeExample = `import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";

import imagesStyles from "assets/jss/material-kit-pro-react/imagesStyles.jsx";

import { cardTitle } from "assets/jss/material-kit-pro-react.jsx";

const style = {
  ...imagesStyles,
  cardTitle
};

function CardExample(props) {
  const { classes } = props;
  return (
    <Card style={{ width: "20rem" }}>
      <img
        style={{ height: "180px", width: "100%", display: "block" }}
        className={classes.imgCardTop}
        src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22320%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20320%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_163df23d717%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A16pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_163df23d717%22%3E%3Crect%20width%3D%22320%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22119.0859375%22%20y%3D%2297.35%22%3E320x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
        alt="Card-img-cap"
      />
      <CardBody>
        <h4 className={classes.cardTitle}>Card title</h4>
        <p>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <Button color="primary">Do something</Button>
      </CardBody>
    </Card>
  );
}

export default withStyles(style)(CardExample);
`;
const codeExampleBody = `import React from "react";
// core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

function CardExampleBody() {
  return (
    <Card>
      <CardBody>This is some text within a card body.</CardBody>
    </Card>
  );
}

export default CardExampleBody;
`;
const codeExampleTitleTextLinks = `import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

import {
  cardTitle,
  cardLink,
  cardSubtitle
} from "assets/jss/material-kit-pro-react.jsx";

const style = {
  cardTitle,
  cardLink,
  cardSubtitle
};

function CardExampleTitleTextLinks(props) {
  const { classes } = props;
  return (
    <Card style={{ width: "20rem" }}>
      <CardBody>
        <h4 className={classes.cardTitle}>Card Title</h4>
        <h6 className={classes.cardSubtitle}>Card Subtitle</h6>
        <p>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <a
          href="#pablo"
          className={classes.cardLink}
          onClick={e => e.preventDefault()}
        >
          Card link
        </a>
        <a
          href="#pablo"
          className={classes.cardLink}
          onClick={e => e.preventDefault()}
        >
          Another link
        </a>
      </CardBody>
    </Card>
  );
}

export default withStyles(style)(CardExampleTitleTextLinks);
`;
const codeExampleHeaderAndFooter = `import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Button from "components/CustomButtons/Button.jsx";

import { cardTitle } from "assets/jss/material-kit-pro-react.jsx";

const style = {
  cardTitle
};

function CardExampleHeaderAndFooter(props) {
  const { classes } = props;
  return (
    <Card style={{ width: "20rem" }}>
      <CardHeader color="warning">Featured</CardHeader>
      <CardBody>
        <h4 className={classes.cardTitle}>Special title treatment</h4>
        <p>
          With supporting text below as a natural lead-in to additional
          content.
        </p>
        <Button color="primary">Do something</Button>
      </CardBody>
    </Card>
  );
}

export default withStyles(style)(CardExampleHeaderAndFooter);
`;
const codeExampleQuote = `import React from "react";
// core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Quote from "components/Typography/Quote.jsx";

function CardExampleQuote() {
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

export default CardExampleQuote;
`;
const codeExampleFeatured = `import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Button from "components/CustomButtons/Button.jsx";

import { cardTitle } from "assets/jss/material-kit-pro-react.jsx";

const style = {
  cardTitle,
  textCenter: {
    textAlign: "center"
  },
  textMuted: {
    color: "#6c757d"
  }
};

function CardExampleFeatured(props) {
  const { classes } = props;
  return (
    <Card className={classes.textCenter}>
      <CardHeader color="danger">Featured</CardHeader>
      <CardBody>
        <h4 className={classes.cardTitle}>Special title treatment</h4>
        <p>
          With supporting text below as a natural lead-in to additional
          content.
        </p>
        <Button color="primary">Do something</Button>
      </CardBody>
      <CardFooter className={classes.textMuted}>2 days ago</CardFooter>
    </Card>
  );
}

export default withStyles(style)(CardExampleFeatured);
`;
const codeExampleTextAlignment = `import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
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

function CardExampleTextAlignment() {
  const { classes } = props;
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

export default withStyles(style)(CardExampleTextAlignment);
`;
const codeExampleImageCaps = `import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

import imagesStyles from "assets/jss/material-kit-pro-react/imagesStyles.jsx";

import { cardTitle } from "assets/jss/material-kit-pro-react.jsx";

const style = {
  ...imagesStyles,
  cardTitle,
  textMuted: {
    color: "#6c757d"
  }
};

function CardExampleImageCaps(props) {
  const { classes } = props;
  return (
    <div>
      <Card>
        <img
          className={classes.imgCardTop}
          src="https://images.unsplash.com/photo-1517303650219-83c8b1788c4c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bd4c162d27ea317ff8c67255e955e3c8&auto=format&fit=crop&w=2691&q=80"
          alt="Card-img-cap"
        />
        <CardBody>
          <h4 className={classes.cardTitle}>Card title</h4>
          <p>
            This is a wider card with supporting text below as a natural
            lead-in to additional content. This content is a little bit
            longer.
          </p>
          <p>
            <small className={classes.textMuted}>
              Last updated 3 mins ago
            </small>
          </p>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <h4 className={classes.cardTitle}>Card title</h4>
          <p>
            This is a wider card with supporting text below as a natural
            lead-in to additional content. This content is a little bit
            longer.
          </p>
          <p>
            <small className={classes.textMuted}>
              Last updated 3 mins ago
            </small>
          </p>
        </CardBody>
        <img
          className={classes.imgCardBottom}
          src="https://images.unsplash.com/photo-1517303650219-83c8b1788c4c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bd4c162d27ea317ff8c67255e955e3c8&auto=format&fit=crop&w=2691&q=80"
          alt="Card-img-cap"
        />
      </Card>
    </div>
  );
}

export default withStyles(style)(CardExampleImageCaps);
`;
const codeExampleImageOverlays = `import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Card from "components/Card/Card.jsx";

import imagesStyles from "assets/jss/material-kit-pro-react/imagesStyles.jsx";

import { cardTitle } from "assets/jss/material-kit-pro-react.jsx";

const style = {
  ...imagesStyles,
  cardTitle
};

function CardExampleImageOverlays(props) {
  const { classes } = props;
  return (
    <Card style={{ color: "white" }}>
      <img
        className={classes.imgCard}
        src="https://images.unsplash.com/photo-1517303650219-83c8b1788c4c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bd4c162d27ea317ff8c67255e955e3c8&auto=format&fit=crop&w=2691&q=80"
        alt="Card-img"
      />
      <div className={classes.imgCardOverlay}>
        <h4 className={classes.cardTitle} style={{ color: "white" }}>
          Card title
        </h4>
        <p>
          This is a wider card with supporting text below as a natural lead-in
          to additional content. This content is a little bit longer.
        </p>
        <p>Last updated 3 mins ago</p>
      </div>
    </Card>
  );
}

export default withStyles(style)(CardExampleImageOverlays);
`;
const codeExampleImages = `import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

import imagesStyles from "assets/jss/material-kit-pro-react/imagesStyles.jsx";

const style = {
  ...imagesStyles
};

function CardExampleImages(props) {
  const { classes } = props;
  return (
    <Card style={{ width: "20rem" }}>
      <img
        style={{ height: "180px", width: "100%", display: "block" }}
        className={classes.imgCardTop}
        src="https://images.unsplash.com/photo-1517303650219-83c8b1788c4c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bd4c162d27ea317ff8c67255e955e3c8&auto=format&fit=crop&w=2691&q=80"
        alt="Card-img-cap"
      />
      <CardBody>
        <p>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
      </CardBody>
    </Card>
  );
}

export default withStyles(style)(CardExampleImages);
`;
const codeExampleListGroups = `import React from "react";
// @material-ui/core components
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
// core components
import Card from "components/Card/Card.jsx";

function CardExampleListGroups() {
  return (
    <Card style={{ width: "20rem" }}>
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

export default CardExampleListGroups;
`;
const codeExampleListGroupsHeader = `import React from "react";

// @material-ui/core components
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
// core components
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

function CardExampleListGroupsHeader() {
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

export default CardExampleListGroupsHeader;
`;
const codeExampleCardBlog = `import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
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

function CardExampleCardBlog() {
  const { classes } = props;
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

export default withStyles(style)(CardExampleCardBlog);
`;
const codeExampleCardColorInfo = `import React from "react";
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

function CardExampleCardColorInfo(props) {
  const { classes } = props;
  return (
    <Card color="info">
      <CardBody color>
        <h5 className={classes.cardCategorySocialWhite}>
          <i className="fab fa-twitter" />Twitter
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
              className={\`\${classes.imgRaised} \${classes.avatar}\`}
            />
            <span>Tania Andrew</span>
          </a>
        </div>
        <div className={\`\${classes.statsWhite} \${classes.mlAuto}\`}>
          <Favorite />
          2.4K ·
          <Share />
          45
        </div>
      </CardFooter>
    </Card>
  );
}

export default withStyles(style)(CardExampleCardColorInfo);
`;
const codeExampleCardTrending = `import React from "react";
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

function CardExampleCardTrending() {
  const { classes } = props;
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
              className={\`\${classes.imgRaised} \${classes.avatar}\`}
            />
            <span>Lord Alex</span>
          </a>
        </div>
        <div className={\`\${classes.stats} \${classes.mlAuto}\`}>
          <Favorite />
          345 ·
          <ChatBubble />
          45
        </div>
      </CardFooter>
    </Card>
  );
}

export default withStyles(style)(CardExampleCardTrending);
`;
const codeExampleCardProfile = `import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
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

function CardExampleCardProfile(props) {
  const { classes } = props;
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
            backgroundImage: \`url(https://images.unsplash.com/photo-1492447273231-0f8fecec1e3a?auto=format&fit=crop&w=334&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D)\`,
            opacity: "1"
          }}
        />
      </CardHeader>
      <CardBody>
        <h4 className={classes.cardTitle}>Alec Thompson</h4>
        <h6 className={\`\${classes.cardCategory} \${classes.cardDescription}\`}>
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

export default withStyles(style)(CardExampleCardProfile);
`;
const codeExampleCardBackground = `import React from "react";
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

function CardExampleCardBackground(props) {
  const { classes } = props;
  return (
    <Card
      background
      style={{
        backgroundImage: \`url(https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=750&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D)\`
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

export default withStyles(style)(CardExampleCardBackground);
`;
const codeExampleCardPricing = `import React from "react";
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

function CardExampleCardPricing(props) {
  const { classes } = props;
  return (
    <Card pricing color="primary" style={{ maxWidth: "235px" }}>
      <CardBody pricing>
        <div className={\`\${classes.iconWrapper} \${classes.iconWrapperColor}\`}>
          <Business className={classes.iconWhite} />
        </div>
        <h3 className={\`\${classes.cardTitleWhite} \${classes.marginTop30}\`}>
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

export default withStyles(style)(CardExampleCardPricing);
`;
const codeExampleCardRotating = `import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui icons
import Subject from "@material-ui/icons/Subject";
import Delete from "@material-ui/icons/Delete";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";

import cardBlog5 from "assets/img/examples/card-blog5.jpg";

import cardsStyle from "assets/jss/material-kit-pro-react/views/componentsSections/sectionCards.jsx";

const style = {
  ...cardsStyle
};

class CardExampleCardRotating extends React.Component {
  componentDidMount() {
    const { classes } = this.props;
    var rotatingCards = document.getElementsByClassName(classes.cardRotate);
    for (let i = 0; i < rotatingCards.length; i++) {
      var rotatingCard = rotatingCards[i];
      var rotatingWrapper = rotatingCard.parentElement;
      var cardWidth = rotatingCard.parentElement.offsetWidth;
      var cardHeight = rotatingCard.children[0].children[0].offsetHeight;
      rotatingWrapper.style.height = cardHeight + "px";
      rotatingWrapper.style["margin-bottom"] = 30 + "px";
      var cardFront = rotatingCard.getElementsByClassName(classes.front)[0];
      var cardBack = rotatingCard.getElementsByClassName(classes.back)[0];
      cardFront.style.height = cardHeight + 35 + "px";
      cardFront.style.width = cardWidth + "px";
      cardBack.style.height = cardHeight + 35 + "px";
      cardBack.style.width = cardWidth + "px";
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={8} lg={6}>
          <div className={classes.rotatingCardContainer}>
            <Card background className={classes.cardRotate}>
              <div
                className={\`\${classes.front} \${classes.wrapperBackground}\`}
                style={{
                  backgroundImage: \`url(\${cardBlog5})\`
                }}
              >
                <CardBody background className={classes.cardBodyRotate}>
                  <h6 className={classes.cardCategoryWhite}>
                    Full Background Card
                  </h6>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    <h3 className={classes.cardTitleWhite}>
                      This Background Card Will Rotate on Hover
                    </h3>
                  </a>
                  <p className={classes.cardDescriptionWhite}>
                    Don't be scared of the truth because we need to restart the
                    human foundation in truth And I love you like Kanye loves
                    Kanye I love Rick Owens’ bed design but the back is...
                  </p>
                </CardBody>
              </div>
              <div
                className={\`\${classes.back} \${classes.wrapperBackground}\`}
                style={{
                  backgroundImage: \`url(\${cardBlog5})\`
                }}
              >
                <CardBody background className={classes.cardBodyRotate}>
                  <h5 className={classes.cardTitleWhite}>Manage Post</h5>
                  <p className={classes.cardDescriptionWhite}>
                    As an Admin, you have shortcuts to edit, view or delete the
                    posts.
                  </p>
                  <div className={classes.textCenter}>
                    <Button round justIcon color="info">
                      <Subject />
                    </Button>
                    <Button round justIcon color="success">
                      <Icon>mode_edit</Icon>
                    </Button>
                    <Button round justIcon color="danger">
                      <Delete />
                    </Button>
                  </div>
                </CardBody>
              </div>
            </Card>
          </div>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(style)(CardExampleCardRotating);
`;

const codeProps = `Card.propTypes = {
  className: PropTypes.string,
  plain: PropTypes.bool,
  profile: PropTypes.bool,
  blog: PropTypes.bool,
  raised: PropTypes.bool,
  background: PropTypes.bool,
  pricing: PropTypes.bool,
  testimonial: PropTypes.bool,
  color: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose"
  ]),
  product: PropTypes.bool
};

CardAvatar.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  profile: PropTypes.bool,
  plain: PropTypes.bool,
  testimonial: PropTypes.bool,
  testimonialFooter: PropTypes.bool
};

CardBody.propTypes = {
  className: PropTypes.string,
  background: PropTypes.bool,
  plain: PropTypes.bool,
  formHorizontal: PropTypes.bool,
  pricing: PropTypes.bool,
  signup: PropTypes.bool,
  color: PropTypes.bool
};

CardFooter.propTypes = {
  className: PropTypes.string,
  plain: PropTypes.bool,
  profile: PropTypes.bool,
  pricing: PropTypes.bool,
  testimonial: PropTypes.bool
};

CardHeader.propTypes = {
  className: PropTypes.string,
  color: PropTypes.oneOf([
    "warning",
    "success",
    "danger",
    "info",
    "primary",
    "rose"
  ]),
  plain: PropTypes.bool,
  image: PropTypes.bool,
  contact: PropTypes.bool,
  signup: PropTypes.bool,
  noShadow: PropTypes.bool
};`;

function Cards() {
  return (
    <div>
      <h1>Cards</h1>
      <h2>Styles</h2>
      <p>
        You will find the styles for these components in
        <br />
        <code>
          src/assets/jss/material-kit-pro-react/components/cardStyle.jsx
        </code>
        <br />
        <code>
          src/assets/jss/material-kit-pro-react/components/cardHeaderStyle.jsx
        </code>
        <br />
        <code>
          src/assets/jss/material-kit-pro-react/components/cardBodyStyle.jsx
        </code>
        <br />
        <code>
          src/assets/jss/material-kit-pro-react/components/cardFooterStyle.jsx
        </code>
        .
      </p>
      <h2>Example</h2>
      <p>
        Below is an example of a basic card with mixed content and a fixed
        width. Cards have no fixed width to start, so they’ll naturally fill the
        full width of its parent element.
      </p>
      <div className="border-example">
        <CardExample />
        <Accordion
          collapses={[
            {
              title: "View Example Code",
              content: (
                <SyntaxHighlighter language="jsx" style={prism}>
                  {codeExample}
                </SyntaxHighlighter>
              )
            }
          ]}
        />
      </div>
      <h2>Content types</h2>
      <p>
        Cards support a wide variety of content, including images, text, list
        groups, links, and more. Below are examples of what’s supported.
      </p>
      <h3>Body</h3>
      <p>
        The building block of a card is the CardBody. Use it whenever you need a
        padded section within a card.
      </p>
      <div className="border-example">
        <CardExampleBody />
        <Accordion
          collapses={[
            {
              title: "View Example Code",
              content: (
                <SyntaxHighlighter language="jsx" style={prism}>
                  {codeExampleBody}
                </SyntaxHighlighter>
              )
            }
          ]}
        />
      </div>
      <h3>Titles, text, and links</h3>
      <p>
        Card titles are used by adding <code>classes.cardTitle</code> to a{" "}
        <code>{`<h*>`}</code> tag. In the same way, links are added and placed
        next to each other by adding <code>classes.cardLink</code> to an {`<a>`}{" "}
        tag.
      </p>
      <div className="border-example">
        <CardExampleTitleTextLinks />
        <Accordion
          collapses={[
            {
              title: "View Example Code",
              content: (
                <SyntaxHighlighter language="jsx" style={prism}>
                  {codeExampleTitleTextLinks}
                </SyntaxHighlighter>
              )
            }
          ]}
        />
      </div>
      <h3>Images</h3>
      <div className="border-example">
        <CardExampleImages />
        <Accordion
          collapses={[
            {
              title: "View Example Code",
              content: (
                <SyntaxHighlighter language="jsx" style={prism}>
                  {codeExampleImages}
                </SyntaxHighlighter>
              )
            }
          ]}
        />
      </div>
      <h3>List groups</h3>
      <p>
        Create lists of contnet in a card using HTML tags as{" "}
        <code>{`<ul>`}</code>, <code>{`<ol>`}</code> and <code>{`<li>`}</code>
      </p>
      <div className="border-example">
        <CardExampleListGroups />
        <Accordion
          collapses={[
            {
              title: "View Example Code",
              content: (
                <SyntaxHighlighter language="jsx" style={prism}>
                  {codeExampleListGroups}
                </SyntaxHighlighter>
              )
            }
          ]}
        />
      </div>
      <br />
      <div className="border-example">
        <CardExampleListGroupsHeader />
        <Accordion
          collapses={[
            {
              title: "View Example Code",
              content: (
                <SyntaxHighlighter language="jsx" style={prism}>
                  {codeExampleListGroupsHeader}
                </SyntaxHighlighter>
              )
            }
          ]}
        />
      </div>
      <h3>Header and Footer</h3>
      <br />
      <div className="border-example">
        <CardExampleHeaderAndFooter />
        <Accordion
          collapses={[
            {
              title: "View Example Code",
              content: (
                <SyntaxHighlighter language="jsx" style={prism}>
                  {codeExampleHeaderAndFooter}
                </SyntaxHighlighter>
              )
            }
          ]}
        />
      </div>
      <br />
      <div className="border-example">
        <CardExampleQuote />
        <Accordion
          collapses={[
            {
              title: "View Example Code",
              content: (
                <SyntaxHighlighter language="jsx" style={prism}>
                  {codeExampleQuote}
                </SyntaxHighlighter>
              )
            }
          ]}
        />
      </div>
      <br />
      <div className="border-example">
        <CardExampleFeatured />
        <br />
        <Accordion
          collapses={[
            {
              title: "View Example Code",
              content: (
                <SyntaxHighlighter language="jsx" style={prism}>
                  {codeExampleFeatured}
                </SyntaxHighlighter>
              )
            }
          ]}
        />
      </div>
      <h2>Text alignment</h2>
      <div className="border-example">
        <CardExampleTextAlignment />
        <Accordion
          collapses={[
            {
              title: "View Example Code",
              content: (
                <SyntaxHighlighter language="jsx" style={prism}>
                  {codeExampleTextAlignment}
                </SyntaxHighlighter>
              )
            }
          ]}
        />
      </div>
      <h2>Images</h2>
      <p>
        Cards include a few options for working with images. Choose from
        appending “image caps” at either end of a card, overlaying images with
        card content, or simply embedding the image in a card.
      </p>
      <h3>Image caps</h3>
      <p>
        Similar to headers and footers, cards can include top and bottom “image
        caps”—images at the top or bottom of a card.
      </p>
      <div className="border-example">
        <CardExampleImageCaps />
        <Accordion
          collapses={[
            {
              title: "View Example Code",
              content: (
                <SyntaxHighlighter language="jsx" style={prism}>
                  {codeExampleImageCaps}
                </SyntaxHighlighter>
              )
            }
          ]}
        />
      </div>
      <h3>Image overalys</h3>
      <p>
        Turn an image into a card background and overlay your card’s text.
        Depending on the image, you may or may not need additional styles or
        utilities.
      </p>
      <div className="border-example">
        <CardExampleImageOverlays />
        <Accordion
          collapses={[
            {
              title: "View Example Code",
              content: (
                <SyntaxHighlighter language="jsx" style={prism}>
                  {codeExampleImageOverlays}
                </SyntaxHighlighter>
              )
            }
          ]}
        />
      </div>
      <h2>Other Examples</h2>
      <div className="border-example">
        <CardExampleCardBlog />
        <Accordion
          collapses={[
            {
              title: "View Example Code",
              content: (
                <SyntaxHighlighter language="jsx" style={prism}>
                  {codeExampleCardBlog}
                </SyntaxHighlighter>
              )
            }
          ]}
        />
      </div>
      <br />
      <div className="border-example">
        <CardExampleCardColorInfo />
        <Accordion
          collapses={[
            {
              title: "View Example Code",
              content: (
                <SyntaxHighlighter language="jsx" style={prism}>
                  {codeExampleCardColorInfo}
                </SyntaxHighlighter>
              )
            }
          ]}
        />
      </div>
      <br />
      <div className="border-example">
        <CardExampleCardTrending />
        <Accordion
          collapses={[
            {
              title: "View Example Code",
              content: (
                <SyntaxHighlighter language="jsx" style={prism}>
                  {codeExampleCardTrending}
                </SyntaxHighlighter>
              )
            }
          ]}
        />
      </div>
      <br />
      <div className="border-example">
        <CardExampleCardProfile />
        <Accordion
          collapses={[
            {
              title: "View Example Code",
              content: (
                <SyntaxHighlighter language="jsx" style={prism}>
                  {codeExampleCardProfile}
                </SyntaxHighlighter>
              )
            }
          ]}
        />
      </div>
      <h3>Full Background Card</h3>
      <div className="border-example">
        <CardExampleCardBackground />
        <Accordion
          collapses={[
            {
              title: "View Example Code",
              content: (
                <SyntaxHighlighter language="jsx" style={prism}>
                  {codeExampleCardBackground}
                </SyntaxHighlighter>
              )
            }
          ]}
        />
      </div>
      <h3>Pricing Card</h3>
      <div className="border-example">
        <CardExampleCardPricing />
        <Accordion
          collapses={[
            {
              title: "View Example Code",
              content: (
                <SyntaxHighlighter language="jsx" style={prism}>
                  {codeExampleCardPricing}
                </SyntaxHighlighter>
              )
            }
          ]}
        />
      </div>
      <h3>Rotating Card</h3>
      <div className="border-example">
        <CardExampleCardRotating />
        <br />
        <br />
        <br />
        <Accordion
          collapses={[
            {
              title: "View Example Code",
              content: (
                <SyntaxHighlighter language="jsx" style={prism}>
                  {codeExampleCardRotating}
                </SyntaxHighlighter>
              )
            }
          ]}
        />
      </div>
      <h2>Props</h2>
      <Accordion
        collapses={[
          {
            title: "View Example Code",
            content: (
              <SyntaxHighlighter language="jsx" style={prism}>
                {codeProps}
              </SyntaxHighlighter>
            )
          }
        ]}
      />
    </div>
  );
}

export default Cards;
