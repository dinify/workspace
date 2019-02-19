import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter/prism";
import { prism } from "react-syntax-highlighter/styles/prism";
// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";
// core components
import Button from "components/CustomButtons/Button.jsx";

const codeImportExamples = `import Button from 'components/CustomButtons/Button.jsx';`;
const codeImportStyle = `import Favorite from '@material-ui/icons/Favorite';
import Button from 'components/CustomButtons/Button.jsx';`;
const codeExampleExamples = `<Button type="button">Default</Button>
<Button type="button" color="primary">Primary</Button>
<Button type="button" color="info">Info</Button>
<Button type="button" color="success">Success</Button>
<Button type="button" color="danger">Danger</Button>
<Button type="button" color="warning">Warning</Button>
<Button type="button" color="rose">Rose</Button>`;
const codeExampleStyle = `<Button color="primary">Default</Button>
<Button color="primary" round>Round</Button>
<Button color="primary" round><Favorite /> With Icon</Button>
<Button justIcon round color="primary"><Favorite style={{ color: "#FFFFFF" }} /></Button>
<Button color="primary" simple>Simple</Button>`;
const codeExampleDisabled = `<Button color="primary" disabled>Default</Button>
<Button color="primary" round disabled>Round</Button>`;
const codeExampleSocial = `<Button color="twitter">
<i
  className={"fab fa-twitter"}
/>{" "}
  Connect with Twitter
</Button>
<Button color="twitter" justIcon>
<i className={ " fab fa-twitter"} />
</Button>
<Button justIcon round color="twitter">
<i
  className={"fab fa-twitter"}
/>
</Button>
<Button color="twitter" simple>
<i
  className={" fab fa-twitter"}
/>
</Button>
<Button color="twitter" simple>
<i
  className={" fab fa-twitter"}
/>{" "}
  Connect with Twitter
</Button>
<br />
<Button color="facebook">
<i
  className={" fab fa-facebook-square"}
/>{" "}
  Share · 2.2k
</Button>
<Button color="facebook" justIcon>
<i className={ " fab fa-facebook"} />
</Button>
<Button justIcon round color="facebook">
<i
  className={" fab fa-facebook"}
/>
</Button>
<Button color="facebook" simple>
<i
  className={" fab fa-facebook-square"}
/>
</Button>
<Button color="facebook" simple>
<i
  className={" fab fa-facebook-square"}
/>{" "}
  Share · 2.2k
</Button>
<br />
<Button color="google">
<i
  className={" fab fa-google-plus-square"}
/>{" "}
  Share on Google+
</Button>
<Button color="google" justIcon>
<i className={ " fab fa-google"} />
</Button>
<Button justIcon round color="google">
<i
  className={" fab fa-google"}
/>
</Button>
<Button color="google" simple>
<i
  className={" fab fa-google"}
/>
</Button>
<Button color="google" simple>
<i
  className={" fab fa-google-square"}
/>{" "}
  Share on Google+
</Button>
<br />
<Button color="github">
  <i
    className={" fab fa-github"}
  />{" "}
  Connect with Github
</Button>
<Button color="github" justIcon>
  <i className={ " fab fa-github"} />
</Button>
<Button justIcon round color="github">
  <i
    className={" fab fa-github"}
  />
</Button>
<Button color="github" simple>
  <i
    className={" fab fa-github"}
  />
</Button>
<Button color="github" simple>
  <i
    className={" fab fa-github"}
  />{" "}
  Connect with Github
</Button>`;
const codeProps = `RegularButton.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose",
    "white",
    "facebook",
    "twitter",
    "google",
    "github",
    "transparent"
  ]),
  size: PropTypes.oneOf(["sm", "lg"]),
  simple: PropTypes.bool,
  round: PropTypes.bool,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  block: PropTypes.bool,
  link: PropTypes.bool,
  justIcon: PropTypes.bool
};`;

function Buttons() {
  return (
    <div>
      <h1>Buttons</h1>
      <p>
        Use Material Kit's React custom button styles for actions in forms,
        dialogs, and more with support for multiple states, and more.
      </p>
      <p>
        You will find all of our restyled buttons from material-ui in{" "}
        <src>src/components/CustomButtons</src>.
      </p>
      <h2>Styles</h2>
      <p>
        You will find the styles for this component in
        <br />
        <code>
          src/assets/jss/material-kit-pro-react/components/buttonStyle.jsx
        </code>
        <br />
        and
        <br />
        <code>
          src/assets/jss/material-kit-pro-react/components/iconButtonStyle.jsx
        </code>
        .
      </p>
      <h2>Examples</h2>
      <p>
        Material Kit PRO React has changed the predefined button styles from
        Material UI, each serving its own semantic purpose, with a few extras
        thrown in for more control.
      </p>
      <div className="border-example">
        <Button type="button">Default</Button>
        <Button type="button" color="primary">
          Primary
        </Button>
        <Button type="button" color="info">
          Info
        </Button>
        <Button type="button" color="success">
          Success
        </Button>
        <Button type="button" color="danger">
          Danger
        </Button>
        <Button type="button" color="warning">
          Warning
        </Button>
        <Button type="button" color="rose">
          Rose
        </Button>
      </div>
      <SyntaxHighlighter language="jsx" style={prism}>
        {codeImportExamples}
      </SyntaxHighlighter>
      <SyntaxHighlighter language="jsx" style={prism}>
        {codeExampleExamples}
      </SyntaxHighlighter>
      <h2>Style Buttons</h2>
      <div className="border-example">
        <Button color="primary">Default</Button>
        <Button color="primary" round>
          Round
        </Button>
        <Button color="primary" round>
          <Favorite /> With Icon
        </Button>
        <Button justIcon round color="primary">
          <Favorite style={{ color: "#FFFFFF" }} />
        </Button>
        <Button color="primary" simple>
          Simple
        </Button>
      </div>
      <SyntaxHighlighter language="jsx" style={prism}>
        {codeImportStyle}
      </SyntaxHighlighter>
      <SyntaxHighlighter language="jsx" style={prism}>
        {codeExampleStyle}
      </SyntaxHighlighter>
      <h2>Disabled state</h2>
      <p>
        Make buttons look inactive by adding the disabled boolean attribute to
        any <code>Button</code>element.
      </p>
      <div className="border-example-8">
        <Button color="primary" disabled>
          Default
        </Button>
        <Button color="primary" round disabled>
          Round
        </Button>
      </div>
      <SyntaxHighlighter language="jsx" style={prism}>
        {codeExampleDisabled}
      </SyntaxHighlighter>
      <h2>Social buttons</h2>
      <div className="border-example-8">
        <Button color="twitter">
          <i className={"fab fa-twitter"} /> Connect with Twitter
        </Button>
        <Button color="twitter" justIcon>
          <i className={" fab fa-twitter"} />
        </Button>
        <Button justIcon round color="twitter">
          <i className={"fab fa-twitter"} />
        </Button>
        <Button color="twitter" simple>
          <i className={" fab fa-twitter"} />
        </Button>
        <Button color="twitter" simple>
          <i className={" fab fa-twitter"} /> Connect with Twitter
        </Button>
        <br />
        <Button color="facebook">
          <i className={" fab fa-facebook-square"} /> Share · 2.2k
        </Button>
        <Button color="facebook" justIcon>
          <i className={" fab fa-facebook"} />
        </Button>
        <Button justIcon round color="facebook">
          <i className={" fab fa-facebook"} />
        </Button>
        <Button color="facebook" simple>
          <i className={" fab fa-facebook-square"} />
        </Button>
        <Button color="facebook" simple>
          <i className={" fab fa-facebook-square"} /> Share · 2.2k
        </Button>
        <br />
        <Button color="google">
          <i className={" fab fa-google-plus-square"} /> Share on Google+
        </Button>
        <Button color="google" justIcon>
          <i className={" fab fa-google"} />
        </Button>
        <Button justIcon round color="google">
          <i className={" fab fa-google"} />
        </Button>
        <Button color="google" simple>
          <i className={" fab fa-google"} />
        </Button>
        <Button color="google" simple>
          <i className={" fab fa-google-square"} /> Share on Google+
        </Button>
        <br />
        <Button color="github">
          <i className={" fab fa-github"} /> Connect with Github
        </Button>
        <Button color="github" justIcon>
          <i className={" fab fa-github"} />
        </Button>
        <Button justIcon round color="github">
          <i className={" fab fa-github"} />
        </Button>
        <Button color="github" simple>
          <i className={" fab fa-github"} />
        </Button>
        <Button color="github" simple>
          <i className={" fab fa-github"} /> Connect with Github
        </Button>
      </div>
      <SyntaxHighlighter language="jsx" style={prism}>
        {codeExampleSocial}
      </SyntaxHighlighter>
      <h2>Properties</h2>
      <SyntaxHighlighter language="jsx" style={prism}>
        {codeProps}
      </SyntaxHighlighter>
      <h2>Material UI Buttons</h2>
      <p>
        For more props and buttons please check out the{" "}
        <a
          href="https://material-ui.com/demos/buttons/"
          target="_blank"
          rel="noopener noreferrer"
        >
          material-ui buttons section
        </a>
        .
      </p>
    </div>
  );
}

export default Buttons;
