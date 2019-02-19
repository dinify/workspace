import React from "react";
// react plugin for creating date-time-picker
import Datetime from "react-datetime";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import SyntaxHighlighter from "react-syntax-highlighter/prism";
import { prism } from "react-syntax-highlighter/styles/prism";

const exampleDateTime = `import React from react;
// react plugin for creating date-time-picker
import Datetime from "react-datetime";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

const style = {
  label: {
    color: "rgba(0, 0, 0, 0.26)",
    cursor: "pointer",
    display: "inline-flex",
    fontSize: "14px",
    transition: "0.3s ease all",
    lineHeight: "1.428571429",
    fontWeight: "400",
    paddingLeft: "0"
  }
};

function DateTimePicker(props) {
  const { classes } = props;
  return (
    <div>
      <InputLabel className={classes.label}>
        Datetime Picker
      </InputLabel>
      <br />
      <FormControl fullWidth>
        <Datetime
          inputProps={{ placeholder: "Datetime Picker Here" }}
        />
      </FormControl>
      <InputLabel className={classes.label}>
        Date Picker
      </InputLabel>
      <br />
      <FormControl fullWidth>
        <Datetime
          timeFormat={false}
          inputProps={{ placeholder: "Date Picker Here" }}
        />
      </FormControl>
      <InputLabel className={classes.label}>
        Time Picker
      </InputLabel>
      <br />
      <FormControl fullWidth>
        <Datetime
          dateFormat={false}
          inputProps={{ placeholder: "Time Picker Here" }}
        />
      </FormControl>
    </div>
  );
}

export default withStyles(style)(DateTimePicker);`;

const style = {
  label: {
    color: "rgba(0, 0, 0, 0.26)",
    cursor: "pointer",
    display: "inline-flex",
    fontSize: "14px",
    transition: "0.3s ease all",
    lineHeight: "1.428571429",
    fontWeight: "400",
    paddingLeft: "0"
  }
};

function DateTimePicker(props) {
  const { classes } = props;
  return (
    <div>
      <h1>React Datetime v2.16.3</h1>
      <p>
        We've used{" "}
        <a
          href="https://github.com/YouCanBookMe/react-datetime"
          target="_blank"
          rel="noopener noreferrer"
        >
          react-datetime
        </a>{" "}
        for this component and we've restyled it to match our theme.
      </p>
      <p>
        Please refer to{" "}
        <a
          href="https://github.com/YouCanBookMe/react-datetime"
          target="_blank"
          rel="noopener noreferrer"
        >
          react-datetime documentation
        </a>{" "}
        for more information.
      </p>
      <h2>Styles</h2>
      <p>
        You will find the styles for this component in
        <br />{" "}
        <code>
          src/assets/scss/material-kit-pro-react/plugins/_plugin-react-datetime.scss
        </code>
        .
      </p>
      <p>
        If you want to match the input of this plugin with the inputs from
        Material-UI, please take a look at this issue here:{" "}
        <a
          href="https://github.com/creativetimofficial/material-kit-react/issues/20"
          target="_blank"
        >
          https://github.com/creativetimofficial/material-kit-react/issues/20
        </a>
      </p>
      <h2>Example</h2>
      <div className="border-example-8">
        <InputLabel className={classes.label}>Datetime Picker</InputLabel>
        <br />
        <FormControl fullWidth>
          <Datetime inputProps={{ placeholder: "Datetime Picker Here" }} />
        </FormControl>
        <InputLabel className={classes.label}>Date Picker</InputLabel>
        <br />
        <FormControl fullWidth>
          <Datetime
            timeFormat={false}
            inputProps={{ placeholder: "Date Picker Here" }}
          />
        </FormControl>
        <InputLabel className={classes.label}>Time Picker</InputLabel>
        <br />
        <FormControl fullWidth>
          <Datetime
            dateFormat={false}
            inputProps={{ placeholder: "Time Picker Here" }}
          />
        </FormControl>
      </div>
      <SyntaxHighlighter language="jsx" style={prism}>
        {exampleDateTime}
      </SyntaxHighlighter>
    </div>
  );
}

export default withStyles(style)(DateTimePicker);
