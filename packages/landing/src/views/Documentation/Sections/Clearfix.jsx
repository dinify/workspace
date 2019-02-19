import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter/prism";
import { prism } from "react-syntax-highlighter/styles/prism";

const codeImport = `import Clearfix from "components/Clearfix/Clearfix.jsx";`;
const codeExample = `<Clearfix />`;

function ClearExample() {
  return (
    <div>
      <h1>Clearfix</h1>
      <p>
        A clearfix is a way for an element to automatically clear its child
        elements, so that you don't need to add additional markup. It's
        generally used in float layouts where elements are floated to be stacked
        horizontally.
      </p>
      <p>
        You can see it being used in{" "}
        <code>src/views/ComponentsPage/Sections/SectionNotifications.jsx</code>.
      </p>
      <SyntaxHighlighter language="jsx" style={prism}>
        {codeImport}
      </SyntaxHighlighter>
      <SyntaxHighlighter language="jsx" style={prism}>
        {codeExample}
      </SyntaxHighlighter>
    </div>
  );
}

export default ClearExample;
