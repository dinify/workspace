import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter/prism";
import { prism } from "react-syntax-highlighter/styles/prism";
import { Link } from "react-router-dom";
// @material-ui/icons
import AttachFile from "@material-ui/icons/AttachFile";
import Layers from "@material-ui/icons/Layers";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomFileInput from "components/CustomFileInput/CustomFileInput.jsx";

const codeExample = `import React from "react";
// @material-ui/icons
import AttachFile from "@material-ui/icons/AttachFile";
import Layers from "@material-ui/icons/Layers";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomFileInput from "components/CustomFileInput/CustomFileInput.jsx";

function FileInput() {
  return (
    <GridContainer>
      <GridItem xs={12} sm={3} md={3}>
        <CustomFileInput
          formControlProps={{
            fullWidth: true
          }}
          inputProps={{
            placeholder: "Simple chooser..."
          }}
        />
        <CustomFileInput
          formControlProps={{
            fullWidth: true
          }}
          inputProps={{
            placeholder: "Single File..."
          }}
          endButton={{
            buttonProps: {
              round: true,
              color: "primary",
              justIcon: true,
              fileButton: true
            },
            icon: <AttachFile />
          }}
        />
        <CustomFileInput
          multiple
          formControlProps={{
            fullWidth: true
          }}
          inputProps={{
            placeholder: "Multiple File..."
          }}
          endButton={{
            buttonProps: {
              round: true,
              color: "info",
              justIcon: true,
              fileButton: true
            },
            icon: <Layers />
          }}
        />
      </GridItem>
    </GridContainer>
  );
};

export default FileInput;
`;

const codeProps = `CustomFileInput.defaultProps = {
  multiple: false
};

CustomFileInput.propTypes = {
  id: PropTypes.string,
  endButton: PropTypes.object,
  startButton: PropTypes.object,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  multiple: PropTypes.bool
};`;

function FileInput() {
  return (
    <div>
      <h1>FileInput</h1>
      <p>
        Since we haven't found a nice library for some nice file inputs, we've
        dcided to create our own fileInputs.
      </p>
      <p>
        This component is actually extending the{" "}
        <Link to="/documentation/input">CustomInput</Link> component, but has
        some extra styles to make it look nice.
      </p>
      <p>
        To make it work for your own purposes you will have to change the{" "}
        <code>{`handleSubmit = e => {`}</code> function which you will find
        inside <code>src/components/CustomFileInput/CustomFileInput.jsx</code>{" "}
        on lince <code>23</code>.
      </p>
      <h2>Styles</h2>
      <p>You will find it's styles inside:</p>
      <code>
        assets/jss/material-kit-pro-react/components/customFileInputStyle.jsx
      </code>
      <h2>Examples</h2>
      <div className="border-example-8">
        <GridContainer>
          <GridItem xs={12} sm={3} md={3}>
            <CustomFileInput
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                placeholder: "Simple chooser..."
              }}
            />
            <CustomFileInput
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                placeholder: "Single File..."
              }}
              endButton={{
                buttonProps: {
                  round: true,
                  color: "primary",
                  justIcon: true,
                  fileButton: true
                },
                icon: <AttachFile />
              }}
            />
            <CustomFileInput
              multiple
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                placeholder: "Multiple File..."
              }}
              endButton={{
                buttonProps: {
                  round: true,
                  color: "info",
                  justIcon: true,
                  fileButton: true
                },
                icon: <Layers />
              }}
            />
          </GridItem>
        </GridContainer>
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

export default FileInput;
