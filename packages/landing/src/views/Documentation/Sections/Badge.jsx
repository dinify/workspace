import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter/prism";
import { prism } from "react-syntax-highlighter/styles/prism";
// core components
import Badge from "components/Badge/Badge.jsx";

const codeImport = `import Badge from "components/Badge/Badge.jsx";`;
const codeExample = `<Badge>gray</Badge>
<Badge color="primary">primary</Badge>
<Badge color="warning">warning</Badge>
<Badge color="danger">danger</Badge>
<Badge color="success">success</Badge>
<Badge color="info">info</Badge>
<Badge color="rose">rose</Badge>`;
const codeProps = `Badge.defaultProps = {
  color: "gray"
};

Badge.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "warning",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  className: PropTypes.string
};`;

function BadgeExample() {
  return (
    <div>
      <h1>Badge</h1>
      <p>This component was added by us.</p>
      <h2>Styles</h2>
      <p>
        You will find the styles for this component in
        <code>
          src/assets/jss/material-kit-pro-react/components/badgeStyle.jsx
        </code>
        .
      </p>
      <h2>Example</h2>
      <div className="border-example">
        <Badge>gray</Badge>
        <Badge color="primary">primary</Badge>
        <Badge color="warning">warning</Badge>
        <Badge color="danger">danger</Badge>
        <Badge color="success">success</Badge>
        <Badge color="info">info</Badge>
        <Badge color="rose">rose</Badge>
      </div>
      <SyntaxHighlighter language="jsx" style={prism}>
        {codeImport}
      </SyntaxHighlighter>
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

export default BadgeExample;
