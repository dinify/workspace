/*eslint-disable*/
import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter/prism";
import { prism } from "react-syntax-highlighter/styles/prism";
// core components
import CustomLinearProgress from "components/CustomLinearProgress/CustomLinearProgress.jsx";

const codeExample = `import React from 'react';
// core components
import CustomLinearProgress from "components/CustomLinearProgress/CustomLinearProgress.jsx";

function LinearProgress(){
  return (
    <div>
      <CustomLinearProgress
        variant="determinate"
        color="primary"
        value={30}
      />
      <CustomLinearProgress
        variant="determinate"
        color="info"
        value={60}
      />
      <CustomLinearProgress
        variant="determinate"
        color="success"
        value={100}
        style={{ width: "35%", display: "inline-block" }}
      />
      <CustomLinearProgress
        variant="determinate"
        color="warning"
        value={100}
        style={{ width: "20%", display: "inline-block" }}
      />
      <CustomLinearProgress
        variant="determinate"
        color="danger"
        value={25}
        style={{ width: "45%", display: "inline-block" }}
      />
    </div>
  );
}

export default LinearProgress;
`;
const codeProps = `CustomLinearProgress.defaultProps = {
  color: "gray"
};

CustomLinearProgress.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "warning",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ])
};`;

function LinearProgress() {
  return (
    <div>
      <h1>CustomLinearProgress</h1>
      <p>
        We've decided to extend the{" "}
        {
          " "
          // eslint-disable-next-line
        }
        <a
          href="https://material-ui-next.com/demos/progress/#linear"
          target="_blank"
        >
          default material-ui linear progress
        </a>{" "}
        to make it more easier for you to use our styles.
      </p>
      <h2>Styles</h2>
      <p>
        You will find the styles for this component in
        <br />{" "}
        <code>
          src/assets/jss/material-kit-pro-react/components/customLinearProgressStyle.jsx
        </code>
        .
      </p>
      <h2>Example</h2>
      <div className="border-example-8">
        <CustomLinearProgress
          variant="determinate"
          color="primary"
          value={30}
        />
        <CustomLinearProgress variant="determinate" color="info" value={60} />
        <CustomLinearProgress
          variant="determinate"
          color="success"
          value={100}
          style={{ width: "35%", display: "inline-block" }}
        />
        <CustomLinearProgress
          variant="determinate"
          color="warning"
          value={100}
          style={{ width: "20%", display: "inline-block" }}
        />
        <CustomLinearProgress
          variant="determinate"
          color="danger"
          value={25}
          style={{ width: "45%", display: "inline-block" }}
        />
      </div>
      <SyntaxHighlighter language="jsx" style={prism}>
        {codeExample}
      </SyntaxHighlighter>
      <h2>Props</h2>
      <p>
        You can pass additional props from the{" "}
        {
          " "
          // eslint-disable-next-line
        }
        <a
          href="https://material-ui-next.com/api/linear-progress/"
          target="_blank"
        >
          default material-ui linear progress
        </a>
        .
      </p>
      <SyntaxHighlighter language="jsx" style={prism}>
        {codeProps}
      </SyntaxHighlighter>
    </div>
  );
}

export default LinearProgress;
