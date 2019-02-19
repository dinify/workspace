/* eslint-disable */
import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter/prism";
import { prism } from "react-syntax-highlighter/styles/prism";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Chat from "@material-ui/icons/Chat";
import Build from "@material-ui/icons/Build";
// core components
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";

const styles = {
  textCenter: {
    textAlign: "center"
  },
  bdExample: {
    padding: "1.5rem",
    margin: "1rem -15px",
    position: "relative",
    marginRight: "0",
    marginBottom: "-8px",
    marginLeft: "0",
    borderWidth: ".2rem",
    border: "solid rgb(245, 242, 240)"
  }
};

const codeExample = `import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Chat from "@material-ui/icons/Chat";
import Build from "@material-ui/icons/Build";
// core components
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";

const styles = {
  textCenter: {
    textAlign: "center"
  }
};

function Tabs(props) {
  const { classes } = props;
  return (
    <div>
      <CustomTabs
        headerColor="primary"
        tabs={[
          {
            tabName: "Profile",
            tabIcon: Face,
            tabContent: (
              <p className={classes.textCenter}>
                I think that’s a responsibility that I have, to push
                possibilities, to show people, this is the level that
                things could be at. So when you get something that has
                the name Kanye West on it, it’s supposed to be pushing
                the furthest possibilities. I will be the leader of a
                company that ends up being worth billions of dollars,
                because I got the answers. I understand culture. I am
                the nucleus.
              </p>
            )
          },
          {
            tabName: "Messages",
            tabIcon: Chat,
            tabContent: (
              <p className={classes.textCenter}>
                I think that’s a responsibility that I have, to push
                possibilities, to show people, this is the level that
                things could be at. I will be the leader of a company
                that ends up being worth billions of dollars, because
                I got the answers. I understand culture. I am the
                nucleus. I think that’s a responsibility that I have,
                to push possibilities, to show people, this is the
                level that things could be at.
              </p>
            )
          },
          {
            tabName: "Settings",
            tabIcon: Build,
            tabContent: (
              <p className={classes.textCenter}>
                think that’s a responsibility that I have, to push
                possibilities, to show people, this is the level that
                things could be at. So when you get something that has
                the name Kanye West on it, it’s supposed to be pushing
                the furthest possibilities. I will be the leader of a
                company that ends up being worth billions of dollars,
                because I got the answers. I understand culture. I am
                the nucleus.
              </p>
            )
          }
        ]}
      />
    </div>
  );
}

export default withStyles(styles)(Tabs);
`;

const codeProps = `CustomTabs.propTypes = {
  headerColor: PropTypes.oneOf([
    "warning",
    "success",
    "danger",
    "info",
    "primary",
    "rose"
  ]),
  title: PropTypes.string,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      tabName: PropTypes.string.isRequired,
      tabIcon: PropTypes.func,
      tabContent: PropTypes.node.isRequired
    })
  ),
  rtlActive: PropTypes.bool,
  plainTabs: PropTypes.bool
};`;

function Tabs(props) {
  const { classes } = props;
  return (
    <div>
      <h1>Tabs</h1>
      {
        // eslint-disable-next-line
      }
      <p>
        We've extended the default{" "}
        <a href="https://material-ui-next.com/demos/tabs/" target="_blank">
          material-ui tabs
        </a>{" "}
        to make it look better with our styles.
      </p>
      <h2>Styles</h2>
      <p>
        You will find all the styles for these components in
        <br />
        <code>
          src/assets/jss/material-kit-pro-react/components/customTabsStyle.jsx
        </code>
        .
      </p>
      <h2>Example</h2>
      <div className={classes.bdExample}>
        <CustomTabs
          headerColor="primary"
          tabs={[
            {
              tabName: "Profile",
              tabIcon: Face,
              tabContent: (
                <p className={classes.textCenter}>
                  I think that’s a responsibility that I have, to push
                  possibilities, to show people, this is the level that things
                  could be at. So when you get something that has the name Kanye
                  West on it, it’s supposed to be pushing the furthest
                  possibilities. I will be the leader of a company that ends up
                  being worth billions of dollars, because I got the answers. I
                  understand culture. I am the nucleus.
                </p>
              )
            },
            {
              tabName: "Messages",
              tabIcon: Chat,
              tabContent: (
                <p className={classes.textCenter}>
                  I think that’s a responsibility that I have, to push
                  possibilities, to show people, this is the level that things
                  could be at. I will be the leader of a company that ends up
                  being worth billions of dollars, because I got the answers. I
                  understand culture. I am the nucleus. I think that’s a
                  responsibility that I have, to push possibilities, to show
                  people, this is the level that things could be at.
                </p>
              )
            },
            {
              tabName: "Settings",
              tabIcon: Build,
              tabContent: (
                <p className={classes.textCenter}>
                  think that’s a responsibility that I have, to push
                  possibilities, to show people, this is the level that things
                  could be at. So when you get something that has the name Kanye
                  West on it, it’s supposed to be pushing the furthest
                  possibilities. I will be the leader of a company that ends up
                  being worth billions of dollars, because I got the answers. I
                  understand culture. I am the nucleus.
                </p>
              )
            }
          ]}
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

export default withStyles(styles)(Tabs);
