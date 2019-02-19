import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter/prism";
import { prism } from "react-syntax-highlighter/styles/prism";

function Icons() {
  return (
    <div>
      <h1>Icons</h1>
      <h2>Icons font</h2>
      <p>
        In order to use the font <code>Icon</code> component, or to use icon
        names (ligatures) directly in components that support them, you must
        first add the{" "}
        <a
          href="https://material.io/icons/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Material icons font
        </a>
        . Here are some{" "}
        <a
          href="https://google.github.io/material-design-icons/#icon-font-for-the-web"
          target="_blank"
          rel="noopener noreferrer"
        >
          instructions
        </a>{" "}
        on how to do so.
      </p>
      <p>You would use them like:</p>
      <SyntaxHighlighter
        language="jsx"
        style={prism}
      >{`<i className="material-icons">name_of_the_icon</i>`}</SyntaxHighlighter>
      <p>or you could use them with material-ui like so:</p>
      <SyntaxHighlighter
        language="jsx"
        style={prism}
      >{`import Icon from "@material-ui/core/Icon";`}</SyntaxHighlighter>
      <SyntaxHighlighter
        language="jsx"
        style={prism}
      >{`<Icon>name_of_the_icon</Icon>`}</SyntaxHighlighter>
      <h2>SVG Icons</h2>
      <p>
        In order to use prebuilt SVG Material icons, such as those found in the
        component demos you must first install the{" "}
        <a
          href="https://www.npmjs.com/package/@material-ui/icons"
          target="_blank"
          rel="noopener noreferrer"
        >
          @material-ui/icons
        </a>{" "}
        package:
      </p>
      <SyntaxHighlighter
        language="jsx"
        style={prism}
      >{`npm install --save @material-ui/icons`}</SyntaxHighlighter>
      <p>Then you would use them like so:</p>
      <SyntaxHighlighter
        language="jsx"
        style={prism}
      >{`import NameOfTheIcon from '@material-ui/icons/NameOfTheIcon';`}</SyntaxHighlighter>
      <SyntaxHighlighter
        language="jsx"
        style={prism}
      >{`<NameOfTheIcon />`}</SyntaxHighlighter>
    </div>
  );
}

export default Icons;
