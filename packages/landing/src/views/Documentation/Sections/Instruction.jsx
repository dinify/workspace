import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter/prism";
import { prism } from "react-syntax-highlighter/styles/prism";
import { Link } from "react-router-dom";
// core components
import Instructions from "components/Instruction/Instruction.jsx";

import image from "assets/img/dg1.jpg";

const codeExample = `import React from 'react';
// core components
import Instructions from "components/Instruction/Instruction.jsx";

import image from "assets/img/dg1.jpg";
function Example({...props}){
  return (
    <Instruction
      title="2. Apply"
      text={
        <span>
          The first step is to create an account at{" "}
          <a href="https://www.creative-tim.com/">
            Creative Tim
          </a>. You can choose a social network or go for
          the classic version, whatever works best for
          you.
        </span>
      }
      image={image}
    />
  );
}

export default Example;
`;
const codeProps = `Instruction.defaultProps = {
  imageAlt: "..."
};

Instruction.propTypes = {
  title: PropTypes.node.isRequired,
  text: PropTypes.node.isRequired,
  image: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  className: PropTypes.string,
  imageClassName: PropTypes.string
};`;

function Instruction({ ...props }) {
  // const { } = props;
  return (
    <div>
      <h1>Instruction</h1>
      <p>
        This component was used on <code>Notice Modal</code> in{" "}
        <Link to="/components#javascriptComponents">Components Page</Link> in
        the Javascript Components Section of our demo app.
      </p>
      <h2>Styles</h2>
      <p>
        You will find the styles for this component in
        <br />{" "}
        <code>
          src/assets/jss/material-kit-pro-react/components/instructionStyle.jsx
        </code>
        .
      </p>
      <h2>Example</h2>
      <div className="border-example-8">
        <Instructions
          title="2. Apply"
          text={
            <span>
              The first step is to create an account at{" "}
              <a href="https://www.creative-tim.com/">Creative Tim</a>. You can
              choose a social network or go for the classic version, whatever
              works best for you.
            </span>
          }
          image={image}
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

export default Instruction;
