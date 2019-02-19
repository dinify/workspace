import React from "react";
// react component plugin for creating beatiful tags on an input
import TagsInputs from "react-tagsinput";

import SyntaxHighlighter from "react-syntax-highlighter/prism";
import { prism } from "react-syntax-highlighter/styles/prism";

const exampleTagsInput = `import React from 'react';
// react component plugin for creating beatiful tags on an input
import TagsInput from "react-tagsinput";

class Tags extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      tags: ["pizza", "pasta", "parmesan"]
    };
    this.handleTags = this.handleTags.bind(this);
  }
  handleTags(regularTags) {
    this.setState({ tags: regularTags });
  }
  render(){
    return (
      <TagsInput
        value={this.state.tags}
        onChange={this.handleTags}
        tagProps={{ className: "react-tagsinput-tag info" }}
      />
    );
  }
}

export default Tags;`;

class TagsInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: ["pizza", "pasta", "parmesan"]
    };
    this.handleTags = this.handleTags.bind(this);
  }

  handleTags(regularTags) {
    this.setState({ tags: regularTags });
  }

  render() {
    return (
      <div>
        <h1>React Tagsinput v3.19.0</h1>
        <p>
          For this we've used{" "}
          <a
            href="https://github.com/olahol/react-tagsinput"
            target="_blank"
            rel="noopener noreferrer"
          >
            react-tagsinput
          </a>{" "}
          and restyled it to match out theme.
        </p>
        <p>
          You can pass the following <code>classNames</code> to get the desire
          color, <code>react-tagsinput-tag $color</code>, where{" "}
          <code>$color</code> can be one of <code>primary</code>,{" "}
          <code>info</code>, <code>success</code>, <code>warning</code> or{" "}
          <code>danger</code>.
        </p>
        <p>
          Please refer to{" "}
          <a
            href="https://github.com/olahol/react-tagsinput"
            target="_blank"
            rel="noopener noreferrer"
          >
            react-tagsinput documentation
          </a>{" "}
          for more information.
        </p>
        <h2>Styles</h2>
        <p>
          You will find the styles for this component in
          <br />{" "}
          <code>
            src/assets/scss/material-kit-pro-react/plugins/_plugin-react-tagsinput.scss
          </code>
          .
        </p>
        <h2>Example</h2>
        <div className="border-example-8">
          <TagsInputs
            value={this.state.tags}
            onChange={this.handleTags}
            tagProps={{ className: "react-tagsinput-tag info" }}
          />
        </div>
        <SyntaxHighlighter language="jsx" style={prism}>
          {exampleTagsInput}
        </SyntaxHighlighter>
      </div>
    );
  }
}

export default TagsInput;
