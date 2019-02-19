import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
// core components
import Button from "components/CustomButtons/Button.jsx";

import tooltipsStyle from "assets/jss/material-kit-pro-react/tooltipsStyle.jsx";
import SyntaxHighlighter from "react-syntax-highlighter/prism";
import { prism } from "react-syntax-highlighter/styles/prism";

const interactiveExample = `
import React from 'react';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
// core components
import Button from "components/CustomButtons/Button.jsx";

import tooltipsStyle from "assets/jss/material-kit-pro-react/tooltipsStyle.jsx";

function Tooltips(props) {
  const { classes } = props;
  return (
    <div>
    <Tooltip
    id="tooltip-left"
    title="Tooltip on left"
    placement="left"
    classes={{ tooltip: classes.tooltip }}
  >
    <Button>On left</Button>
  </Tooltip>
  <Tooltip
    id="tooltip-top"
    title="Tooltip on top"
    placement="top"
    classes={{ tooltip: classes.tooltip }}
  >
    <Button>On top</Button>
  </Tooltip>
  <Tooltip
    id="tooltip-bottom"
    title="Tooltip on bottom"
    placement="bottom"
    classes={{ tooltip: classes.tooltip }}
  >
    <Button>On bottom</Button>
  </Tooltip>
  <Tooltip
    id="tooltip-right"
    title="Tooltip on right"
    placement="right"
    classes={{ tooltip: classes.tooltip }}
  >
    <Button>On right</Button>
  </Tooltip>
    </div>
  );
}

export default withStyles(tooltipsStyle)(Tooltips);
`;

function Tooltips(props) {
  const { classes } = props;
  return (
    <div>
      <h1>Tooltips</h1>
      <h2>Styles</h2>
      <p>
        You will find all the styles for these components in
        <br />
        <code>src/assets/jss/material-kit-pro-react/tooltipsStyle.jsx</code>.
      </p>
      <h2>Examples</h2>
      <p>Hover over the links below to see tooltips:</p>
      <div className="border-example">
        <div className="tooltip-demo">
          <p>
            Tight pants next level keffiyeh
            <Tooltip
              id="some-id"
              title="Default tooltip"
              placement="top"
              classes={{ tooltip: classes.tooltip }}
            >
              <a href="#pablo" onClick={e => e.preventDefault()}>
                {" "}
                you probably{" "}
              </a>
            </Tooltip>
            haven't heard of them. Photo booth beard raw denim letterpress vegan
            messenger bag stumptown. Farm-to-table seitan, mcsweeney's fixie
            sustainable quinoa 8-bit american apparel{" "}
            <Tooltip
              id="some-id"
              title="Another tooltip"
              placement="top"
              classes={{ tooltip: classes.tooltip }}
            >
              <a href="#pablo" onClick={e => e.preventDefault()}>
                {" "}
                have a{" "}
              </a>
            </Tooltip>
            terry richardson vinyl chambray. Beard stumptown, cardigans banh mi
            lomo thundercats. Tofu biodiesel williamsburg marfa, four loko
            mcsweeney's cleanse vegan chambray. A really ironic artisan{" "}
            <Tooltip
              id="some-id"
              title="Another one here too"
              placement="top"
              classes={{ tooltip: classes.tooltip }}
            >
              <a href="#pablo" onClick={e => e.preventDefault()}>
                {" "}
                whatever keytar
              </a>
            </Tooltip>
            , scenester farm-to-table banksy Austin{" "}
            <Tooltip
              id="some-id"
              title="The last tip!"
              placement="top"
              classes={{ tooltip: classes.tooltip }}
            >
              <a href="#pablo" onClick={e => e.preventDefault()}>
                {" "}
                twitter handle{" "}
              </a>
            </Tooltip>{" "}
            freegan cred raw denim single-origin coffee viral.
          </p>
        </div>
      </div>
      <h2>Interactive demo</h2>
      <p>Hover over the buttons below to see their tooltips.</p>
      <div className="border-example-8">
        <Tooltip
          id="tooltip-left"
          title="Tooltip on left"
          placement="left"
          classes={{ tooltip: classes.tooltip }}
        >
          <Button>On left</Button>
        </Tooltip>
        <Tooltip
          id="tooltip-top"
          title="Tooltip on top"
          placement="top"
          classes={{ tooltip: classes.tooltip }}
        >
          <Button>On top</Button>
        </Tooltip>
        <Tooltip
          id="tooltip-bottom"
          title="Tooltip on bottom"
          placement="bottom"
          classes={{ tooltip: classes.tooltip }}
        >
          <Button>On bottom</Button>
        </Tooltip>
        <Tooltip
          id="tooltip-right"
          title="Tooltip on right"
          placement="right"
          classes={{ tooltip: classes.tooltip }}
        >
          <Button>On right</Button>
        </Tooltip>
      </div>
      <SyntaxHighlighter language="jsx" style={prism}>
        {interactiveExample}
      </SyntaxHighlighter>
      <h2>Props</h2>
      <p>
        For more details please refer to{" "}
        <a
          href="https://material-ui-next.com/demos/tooltips/"
          target="_blank"
          rel="noopener noreferrer"
        >
          material-ui
        </a>
        .
      </p>
    </div>
  );
}

export default withStyles(tooltipsStyle)(Tooltips);
