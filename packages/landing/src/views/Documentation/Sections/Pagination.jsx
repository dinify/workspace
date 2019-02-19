import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter/prism";
import { prism } from "react-syntax-highlighter/styles/prism";
// core components
import Accordion from "components/Accordion/Accordion.jsx";

// code examples
import ExampleOverview from "./Pagination/ExampleOverview.jsx";
import ExampleActiveDisabled from "./Pagination/ExampleActiveDisabled.jsx";
import ExampleAlignmentCenter from "./Pagination/ExampleAlignmentCenter.jsx";
import ExampleAlignmentRight from "./Pagination/ExampleAlignmentRight.jsx";

const codeExampleOverview = `import React from "react";
// core components
import Pagination from "components/Pagination/Pagination.jsx";

const PaginationDocs = props => {
  return (
    <Pagination
      pages={[
        { text: "Previous" },
        { text: 1 },
        { text: 2 },
        { text: 3 },
        { text: "Next" }
      ]}
    />
  );
};

export default PaginationDocs;
`;
const codeExampleActiveDisabled = `import React from "react";
// core components
import Pagination from "components/Pagination/Pagination.jsx";

const PaginationDocs = props => {
  return (
    <Pagination
      pages={[
        { disabled: true, text: "Previous" },
        { text: 1 },
        { active: true, text: 2 },
        { text: 3 },
        { text: "Next" }
      ]}
    />
  );
};

export default PaginationDocs;
`;
const codeExampleAlignmentCenter = `import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Pagination from "components/Pagination/Pagination.jsx";

const styles = {
  justifyContentCenter: {
    "& > ul": {
      justifyContent: "center!important"
    }
  }
};

const PaginationDocs = props => {
  const { classes } = props;
  return (
    <div className={classes.justifyContentCenter}>
      <Pagination
        pages={[
          { text: "Previous" },
          { text: 1 },
          { text: 2 },
          { text: 3 },
          { text: "Next" }
        ]}
      />
    </div>
  );
};

export default withStyles(styles)(PaginationDocs);
`;
const codeExampleAlignmentRight = `import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Pagination from "components/Pagination/Pagination.jsx";

const styles = {
  justifyContentEnd: {
    "& > ul": {
      justifyContent: "flex-end!important"
    }
  }
};

function PaginationDocs(props) {
  const { classes } = props;
  return (
    <div className={classes.justifyContentEnd}>
      <Pagination
        pages={[
          { text: "Previous" },
          { text: 1 },
          { text: 2 },
          { text: 3 },
          { text: "Next" }
        ]}
      />
    </div>
  );
};

export default withStyles(styles)(PaginationDocs);
`;
const codeProps = `Pagination.defaultProps = {
  color: "primary"
};

Pagination.propTypes = {
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      active: PropTypes.bool,
      disabled: PropTypes.bool,
      text: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
      onClick: PropTypes.func
    })
  ).isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"])
};`;

function PaginationDocs() {
  return (
    <div>
      <h1>Pagination</h1>
      <p>
        We've created this special component due to the fact that you would have
        needed to write a lot of code to obtain a small component. So, it was
        done to make your life easier.
      </p>
      <h2>Styles</h2>
      <p>
        You will find the styles for this component in
        <br />
        <code>
          src/assets/jss/material-kit-pro-react/components/paginationStyle.jsx.
        </code>
      </p>
      <h2>Overview</h2>
      <div className="border-example">
        <ExampleOverview />
        <Accordion
          collapses={[
            {
              title: "View Example Code",
              content: (
                <SyntaxHighlighter language="jsx" style={prism}>
                  {codeExampleOverview}
                </SyntaxHighlighter>
              )
            }
          ]}
        />
      </div>
      <h2>Disabled and active states</h2>
      <p>
        Pagination links are customizable for different circumstances. Use{" "}
        <code>{`disabled: true`}</code> for links that appear un-clickable and{" "}
        <code>{`active: true`}</code> to indicate the current page.
      </p>
      <div className="border-example">
        <ExampleActiveDisabled />
        <Accordion
          collapses={[
            {
              title: "View Example Code",
              content: (
                <SyntaxHighlighter language="jsx" style={prism}>
                  {codeExampleActiveDisabled}
                </SyntaxHighlighter>
              )
            }
          ]}
        />
      </div>
      <h2>Alignment</h2>
      <p>
        Change the alignment of pagination components with flexbox utilities.
      </p>
      <div className="border-example">
        <ExampleAlignmentCenter />
        <Accordion
          collapses={[
            {
              title: "View Example Code",
              content: (
                <SyntaxHighlighter language="jsx" style={prism}>
                  {codeExampleAlignmentCenter}
                </SyntaxHighlighter>
              )
            }
          ]}
        />
      </div>
      <div className="border-example">
        <ExampleAlignmentRight />
        <Accordion
          collapses={[
            {
              title: "View Example Code",
              content: (
                <SyntaxHighlighter language="jsx" style={prism}>
                  {codeExampleAlignmentRight}
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

export default PaginationDocs;
