import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter/prism";
import { prism } from "react-syntax-highlighter/styles/prism";
// core components
import Accordion from "components/Accordion/Accordion.jsx";

// examples
import ExampleSingleButton from "./Dropdown/ExampleSingleButton.jsx";
import ExampleA from "./Dropdown/ExampleA.jsx";
import ExampleVariant from "./Dropdown/ExampleVariant.jsx";
import ExampleSplitDropdowns from "./Dropdown/ExampleSplitDropdowns.jsx";
import ExampleDropup from "./Dropdown/ExampleDropup.jsx";
import ExampleMultiLevel from "./Dropdown/ExampleMultiLevel.jsx";

const codeExampleSingleButton = `
import React from "react";
// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";

function Dropdown {
  return (
    <div>
      <CustomDropdown
        buttonText="Dropdown Button"
        dropdownList={[
          "Action",
          "Another action",
          "Something else here",
          { divider: true },
          "Separated link",
          { divider: true },
          "One more separated link"
        ]}
      />
    </div>
  );
};

export default Dropdown;

`;
const codeExampleA = `
import React from "react";
// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";

function Dropdown() {
  return (
    <div>
      <CustomDropdown
        dropdownHeader="Dropdown header"
        buttonText="Dropdown Link"
        buttonProps={{
          href: "#pablo"
        }}
        dropdownList={[
          "Action",
          "Another action",
          "Something else here",
          { divider: true },
          "Separated link",
          { divider: true },
          "One more separated link"
        ]}
      />
    </div>
  );
};

export default Dropdown;

`;
const codeExampleVariant = `
import React from "react";
// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";

function Dropdown() {
  return (
    <div>
      <CustomDropdown
        buttonText="Primary"
        buttonProps={{
          color: "primary"
        }}
        dropdownList={[
          "Action",
          "Another action",
          "Something else here",
          { divider: true },
          "Separated link"
        ]}
      />
      <CustomDropdown
        buttonText="Secondary"
        buttonProps={{
          color: "secondary"
        }}
        dropdownList={[
          "Action",
          "Another action",
          "Something else here",
          { divider: true },
          "Separated link"
        ]}
      />
      <CustomDropdown
        buttonText="Success"
        buttonProps={{
          color: "success"
        }}
        dropdownList={[
          "Action",
          "Another action",
          "Something else here",
          { divider: true },
          "Separated link"
        ]}
      />
      <CustomDropdown
        buttonText="Info"
        buttonProps={{
          color: "info"
        }}
        dropdownList={[
          "Action",
          "Another action",
          "Something else here",
          { divider: true },
          "Separated link"
        ]}
      />
      <CustomDropdown
        buttonText="Warning"
        buttonProps={{
          color: "warning"
        }}
        dropdownList={[
          "Action",
          "Another action",
          "Something else here",
          { divider: true },
          "Separated link"
        ]}
      />
      <CustomDropdown
        buttonText="Danger"
        buttonProps={{
          color: "danger"
        }}
        dropdownList={[
          "Action",
          "Another action",
          "Something else here",
          { divider: true },
          "Separated link"
        ]}
      />
    </div>
  );
};

export default Dropdown;

`;
const codeExampleSplitDropdowns = `
import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import Button from "components/CustomButtons/Button.jsx";

import buttonGroupStyle from "assets/jss/material-kit-pro-react/buttonGroupStyle.jsx";

function Dropdown(props) {
  const { classes } = props;
  return (
    <div>
      <div className={classes.buttonGroup}>
        <Button color="primary" className={classes.firstButton}>
          PRIMARY
        </Button>
        <CustomDropdown
          buttonProps={{
            color: "primary",
            className: classes.lastButton
          }}
          dropdownList={[
            "Action",
            "Another action",
            "Something else here",
            { divider: true },
            "Separated link"
          ]}
        />
      </div>
      <div className={classes.buttonGroup}>
        <Button color="secondary" className={classes.firstButton}>
          Secondary
        </Button>
        <CustomDropdown
          hoverColor="black"
          buttonProps={{
            color: "secondary",
            className: classes.lastButton
          }}
          dropdownList={[
            "Action",
            "Another action",
            "Something else here",
            { divider: true },
            "Separated link"
          ]}
        />
      </div>
      <div className={classes.buttonGroup}>
        <Button color="success" className={classes.firstButton}>
          Success
        </Button>
        <CustomDropdown
          hoverColor="success"
          buttonProps={{
            color: "success",
            className: classes.lastButton
          }}
          dropdownList={[
            "Action",
            "Another action",
            "Something else here",
            { divider: true },
            "Separated link"
          ]}
        />
      </div>
      <div className={classes.buttonGroup}>
        <Button color="info" className={classes.firstButton}>
          Info
        </Button>
        <CustomDropdown
          hoverColor="info"
          buttonProps={{
            color: "info",
            className: classes.lastButton
          }}
          dropdownList={[
            "Action",
            "Another action",
            "Something else here",
            { divider: true },
            "Separated link"
          ]}
        />
      </div>
      <div className={classes.buttonGroup}>
        <Button color="warning" className={classes.firstButton}>
          Warning
        </Button>
        <CustomDropdown
          hoverColor="warning"
          buttonProps={{
            color: "warning",
            className: classes.lastButton
          }}
          dropdownList={[
            "Action",
            "Another action",
            "Something else here",
            { divider: true },
            "Separated link"
          ]}
        />
      </div>
      <div className={classes.buttonGroup}>
        <Button color="danger" className={classes.firstButton}>
          Danger
        </Button>
        <CustomDropdown
          hoverColor="danger"
          buttonProps={{
            color: "danger",
            className: classes.lastButton
          }}
          dropdownList={[
            "Action",
            "Another action",
            "Something else here",
            { divider: true },
            "Separated link"
          ]}
        />
      </div>
    </div>
  );
};

export default withStyles(buttonGroupStyle)(Dropdown);

`;
const codeExampleDropup = `
import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import Button from "components/CustomButtons/Button.jsx";

import buttonGroupStyle from "assets/jss/material-kit-pro-react/buttonGroupStyle.jsx";

function Dropdown(props) {
  const { classes } = props;
  return (
    <div>
      <CustomDropdown
        dropup
        hoverColor="black"
        buttonText="Dropup"
        buttonProps={{
          color: "secondary"
        }}
        dropdownList={[
          "Action",
          "Another action",
          "Something else here",
          { divider: true },
          "Separated link"
        ]}
      />
      <div className={classes.buttonGroup}>
        <Button color="secondary" className={classes.firstButton}>
          Split dropup
        </Button>
        <CustomDropdown
          dropup
          hoverColor="black"
          buttonProps={{
            color: "secondary",
            className: classes.lastButton
          }}
          dropdownList={[
            "Action",
            "Another action",
            "Something else here",
            { divider: true },
            "Separated link"
          ]}
        />
      </div>
    </div>
  );
};

export default withStyles(buttonGroupStyle)(Dropdown);

`;

const codeExampleMultiLevel = `import React from "react";
// @material-ui/core components
// @material-ui/icons
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";

class Example extends React.Component {
  render(){
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={8} lg={6}>
        <CustomDropdown
          dropdownHeader="Dropdown header"
          buttonText="Multilevel Dropdown"
          buttonProps={{
            round: true,
            block: true,
            color: "info"
          }}
          dropPlacement="bottom-start"
          dropdownList={[
            "Action",
            "Another action",
            "Something else here",
            { divider: true },
            "Separated link",
            { divider: true },
            "One more separated link",
            <CustomDropdown
              ref="multi"
              innerDropDown
              buttonText="Submenu"
              buttonProps={{
                simple: true,
                block: true
              }}
              dropPlacement="right-start"
              dropdownList={[
                "Submenu action",
                "Submenu action",
                <CustomDropdown
                  ref="multi"
                  innerDropDown
                  buttonText="Second submenu"
                  buttonProps={{
                    simple: true
                  }}
                  dropPlacement="right-start"
                  dropdownList={["Submenu action 1", "Submenu action 2"]}
                />
              ]}
            />
          ]}
        />
      </GridItem>
    </GridContainer>
  );
}
}

export default Example;
`;

const codeProps = `CustomDropdown.defaultProps = {
  caret: true,
  dropup: false,
  hoverColor: "primary"
};

CustomDropdown.propTypes = {
  classes: PropTypes.object.isRequired,
  hoverColor: PropTypes.oneOf([
    "dark",
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose"
  ]),
  buttonText: PropTypes.node,
  buttonIcon: PropTypes.func,
  dropdownList: PropTypes.array,
  buttonProps: PropTypes.object,
  dropup: PropTypes.bool,
  dropdownHeader: PropTypes.node,
  rtlActive: PropTypes.bool,
  caret: PropTypes.bool,
  dropPlacement: PropTypes.oneOf([
    "bottom",
    "top",
    "right",
    "left",
    "bottom-start",
    "bottom-end",
    "top-start",
    "top-end",
    "right-start",
    "right-end",
    "left-start",
    "left-end"
  ]),
  noLiPadding: PropTypes.bool,
  innerDropDown: PropTypes.bool,
  navDropdown: PropTypes.bool,
  // This is a function that returns the clicked menu item
  onClick: PropTypes.func
};`;

function Dropdown() {
  return (
    <div>
      <h1>Dropdowns</h1>
      <p>
        We've decided to create this component to make it easier for you to
        create a dropdown.
      </p>
      <h2>Styles</h2>
      <p>
        You will find the styles for this component in
        <br />
        <code>
          src/assets/jss/material-kit-pro-react/components/customDropdownStyle.jsx
        </code>
        .
      </p>
      <h2>Examples</h2>
      <h3>Single button dropdown</h3>
      <div className="border-example">
        <ExampleSingleButton />
        <Accordion
          collapses={[
            {
              title: "View Example Code",
              content: (
                <SyntaxHighlighter language="jsx" style={prism}>
                  {codeExampleSingleButton}
                </SyntaxHighlighter>
              )
            }
          ]}
        />
      </div>
      <p>
        Rendered with an <code>{`<a>`}</code> component:
      </p>
      <div className="border-example">
        <ExampleA />
        <Accordion
          collapses={[
            {
              title: "View Example Code",
              content: (
                <SyntaxHighlighter language="jsx" style={prism}>
                  {codeExampleA}
                </SyntaxHighlighter>
              )
            }
          ]}
        />
      </div>
      <p>The best part is you can do this with any button variant, too:</p>
      <div className="border-example">
        <ExampleVariant />
        <Accordion
          collapses={[
            {
              title: "View Example Code",
              content: (
                <SyntaxHighlighter language="jsx" style={prism}>
                  {codeExampleVariant}
                </SyntaxHighlighter>
              )
            }
          ]}
        />
      </div>
      <h3>Split button dropdowns</h3>
      <div className="border-example">
        <ExampleSplitDropdowns />
        <Accordion
          collapses={[
            {
              title: "View Example Code",
              content: (
                <SyntaxHighlighter language="jsx" style={prism}>
                  {codeExampleSplitDropdowns}
                </SyntaxHighlighter>
              )
            }
          ]}
        />
      </div>
      <h2>Dropup variation</h2>
      <p>
        By adding the prop <code>dropup</code> you can change the menu to be
        rendered above instead of below.
      </p>
      <div className="border-example">
        <ExampleDropup />
        <Accordion
          collapses={[
            {
              title: "View Example Code",
              content: (
                <SyntaxHighlighter language="jsx" style={prism}>
                  {codeExampleDropup}
                </SyntaxHighlighter>
              )
            }
          ]}
        />
      </div>
      <h2>Multilevel Dropdown</h2>
      <div className="border-example">
        <ExampleMultiLevel />
        <Accordion
          collapses={[
            {
              title: "View Example Code",
              content: (
                <SyntaxHighlighter language="jsx" style={prism}>
                  {codeExampleMultiLevel}
                </SyntaxHighlighter>
              )
            }
          ]}
        />
      </div>
      <h2>Props</h2>
      <SyntaxHighlighter language="jsx" style={prism}>
        {codeProps}
      </SyntaxHighlighter>
    </div>
  );
}

export default Dropdown;
