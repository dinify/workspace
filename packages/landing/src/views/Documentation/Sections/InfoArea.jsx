import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter/prism";
import { prism } from "react-syntax-highlighter/styles/prism";
// @material-ui icons
import Timeline from "@material-ui/icons/Timeline";
// core components
import InfoAreas from "components/InfoArea/InfoArea.jsx";

const codeExample = `import React from "react";

// @material-ui/icons
import Timeline from "@material-ui/icons/Timeline";

// core components
import InfoArea from "components/InfoArea/InfoArea.jsx";

function Example(){
  return (
    <InfoArea
      title="Marketing"
      description="We've created the marketing campaign of the website. It was a very interesting collaboration."
      icon={Timeline}
      iconColor="rose"
    />
  );
}
export default Example;
`;
const codeProps = `InfoArea.defaultProps = {
  iconColor: "gray"
};

InfoArea.propTypes = {
  icon: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.node.isRequired,
  iconColor: PropTypes.oneOf([
    "primary",
    "warning",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  vertical: PropTypes.bool,
  className: PropTypes.string
};`;

function InfoArea() {
  return (
    <div>
      <h1>InfoArea</h1>
      <p>
        This component was made by us to make it a bit more easier for you to
        render some informations.
      </p>
      <h2>Styles</h2>
      <p>
        You will find the styles for this component in
        <br />{" "}
        <code>
          src/assets/jss/material-kit-pro-react/components/infoStyle.jsx
        </code>
        .
      </p>
      <h2>Example</h2>
      <div className="border-example">
        <InfoAreas
          title="Marketing"
          description="We've created the marketing campaign of the website. It was a very interesting collaboration."
          icon={Timeline}
          iconColor="rose"
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

export default InfoArea;
