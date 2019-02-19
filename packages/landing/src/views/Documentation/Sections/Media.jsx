import React from "react";
import { Link } from "react-router-dom";
import SyntaxHighlighter from "react-syntax-highlighter/prism";
import { prism } from "react-syntax-highlighter/styles/prism";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
// @material-ui/icons
import Reply from "@material-ui/icons/Reply";
import Favorite from "@material-ui/icons/Favorite";
// core components
import Media from "components/Media/Media.jsx";
import Button from "components/CustomButtons/Button.jsx";

import profile4 from "assets/img/faces/card-profile4-square.jpg";

import sectionCommentsStyle from "assets/jss/material-kit-pro-react/views/blogPostSections/sectionCommentsStyle.jsx";

const codeExample = `import React from "react";
import {Link} from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
// @material-ui/icons
import Reply from "@material-ui/icons/Reply";
import Favorite from "@material-ui/icons/Favorite";
// core components
import Media from "components/Media/Media.jsx";
import Button from "components/CustomButtons/Button.jsx";

import profile4 from "assets/img/faces/card-profile4-square.jpg";

import sectionCommentsStyle from "assets/jss/material-kit-pro-react/views/blogPostSections/sectionCommentsStyle.jsx";

function MediaDocs(props) {
  const { classes } = props;
  return (
    <Media
      avatar={profile4}
      title={
        <span>
          Tina Andrew <small>· 7 minutes ago</small>
        </span>
      }
      body={
        <p className={classes.color555}>
          Chance too good. God level bars. I'm so proud of
          @LifeOfDesiigner #1 song in the country. Panda! Don't be
          scared of the truth because we need to restart the human
          foundation in truth I stand with the most humility. We are so
          blessed!
        </p>
      }
      footer={
        <div>
          <Tooltip
            id="tooltip-tina"
            title="Reply to comment"
            placement="top"
            classes={{ tooltip: classes.tooltip }}
          >
            <Button
              color="primary"
              simple
              className={classes.footerButtons}
            >
              <Reply className={classes.footerIcons} /> Reply
            </Button>
          </Tooltip>

          <Button
            color="danger"
            simple
            className={classes.footerButtons}
          >
            <Favorite className={classes.footerIcons} /> 243
          </Button>
        </div>
      }
    />
  );
};

export default withStyles(sectionCommentsStyle)(MediaDocs);
`;

const codeProps = `Media.defaultProps = {
  avatarLink: "#pablo",
  avatarAlt: "..."
};

Media.propTypes = {
  avatarLink: PropTypes.string,
  avatar: PropTypes.string,
  avatarAlt: PropTypes.string,
  title: PropTypes.node,
  body: PropTypes.node,
  footer: PropTypes.node,
  innerMedias: PropTypes.arrayOf(PropTypes.object)
};`;

function MediaDocs(props) {
  const { classes } = props;
  return (
    <div>
      <h1>Media</h1>
      <p>
        We've created this component to create nice comments like ui components
        especially for blogs. You can see how it looks on a Blog Page{" "}
        <Link to="/blog-post">here</Link>.
      </p>
      <h2>Styles</h2>
      <p>
        You will find the styles for this component inside: <br />
        <code>
          src/assets/jss/material-kit-pro-react/components/mediaStyle.jsx
        </code>
      </p>
      <h2>Example</h2>
      <div className="border-example-8">
        <Media
          avatar={profile4}
          title={
            <span>
              Tina Andrew <small>· 7 minutes ago</small>
            </span>
          }
          body={
            <p className={classes.color555}>
              Chance too good. God level bars. I'm so proud of @LifeOfDesiigner
              #1 song in the country. Panda! Don't be scared of the truth
              because we need to restart the human foundation in truth I stand
              with the most humility. We are so blessed!
            </p>
          }
          footer={
            <div>
              <Tooltip
                id="tooltip-tina"
                title="Reply to comment"
                placement="top"
                classes={{ tooltip: classes.tooltip }}
              >
                <Button
                  color="primary"
                  simple
                  className={classes.footerButtons}
                >
                  <Reply className={classes.footerIcons} /> Reply
                </Button>
              </Tooltip>

              <Button color="danger" simple className={classes.footerButtons}>
                <Favorite className={classes.footerIcons} /> 243
              </Button>
            </div>
          }
        />
      </div>
      <SyntaxHighlighter language="jsx" style={prism}>
        {codeExample}
      </SyntaxHighlighter>
      <h2>Props</h2>
      <SyntaxHighlighter language="jsx" style={prism}>
        {codeProps}
      </SyntaxHighlighter>
    </div>
  );
}

export default withStyles(sectionCommentsStyle)(MediaDocs);
