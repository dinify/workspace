/*eslint-disable*/
import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter/prism";
import { prism } from "react-syntax-highlighter/styles/prism";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// @material-ui icons
import Check from "@material-ui/icons/Check";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
// core components
import Accordion from "components/Accordion/Accordion.jsx";

import styles from "assets/jss/material-kit-pro-react/customCheckboxRadioSwitchStyle.jsx";

const codeImport = `import styles from "assets/jss/material-kit-pro-react/customCheckboxRadioSwitchStyle.jsx";`;
const codeExampleCheckboxes = `import React from 'react';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// @material-ui/icons
import Check from '@material-ui/icons/Check';
// core components
import styles from "assets/jss/material-kit-pro-react/customCheckboxRadioSwitchStyle.jsx";

class CheckboxExample extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      checked: [24, 22],
    };
  }
  handleToggle(value) {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  }
  render(){
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.checkboxAndRadio + " " + classes.checkboxAndRadioHorizontal}>
          <FormControlLabel
            control={
              <Checkbox
                tabIndex={-1}
                onClick={() => this.handleToggle(21)}
                checkedIcon={<Check className={classes.checkedIcon} />}
                icon={<Check className={classes.uncheckedIcon} />}
                classes={{
                  checked: classes.checked,
                  root: classes.checkRoot
                }}
              />
            }
            classes={{label: classes.label}}
            label="Unchecked"
          />
        </div>
        <div className={classes.checkboxAndRadio + " " + classes.checkboxAndRadioHorizontal}>
          <FormControlLabel
            control={
              <Checkbox
                tabIndex={-1}
                onClick={() => this.handleToggle(22)}
                checked={this.state.checked.indexOf(22) !== -1 ? true:false}
                checkedIcon={<Check className={classes.checkedIcon} />}
                icon={<Check className={classes.uncheckedIcon} />}
                classes={{
                  checked: classes.checked,
                  root: classes.checkRoot
                }}
              />
            }
            classes={{label: classes.label}}
            label="Checked"
          />
        </div>
        <div className={classes.checkboxAndRadio + " " + classes.checkboxAndRadioHorizontal}>
          <FormControlLabel
            disabled
            control={
              <Checkbox
                tabIndex={-1}
                checkedIcon={<Check className={classes.checkedIcon} />}
                icon={<Check className={classes.uncheckedIcon} />}
                classes={{
                  checked: classes.checked,
                  root: classes.checkRoot
                }}
              />
            }
            classes={{
              label: classes.label,
              disabled: classes.disabledCheckboxAndRadio
            }}
            label="Disabled Unchecked"
          />
        </div>
        <div className={classes.checkboxAndRadio + " " + classes.checkboxAndRadioHorizontal}>
          <FormControlLabel
            disabled
            control={
              <Checkbox
                tabIndex={-1}
                checked={this.state.checked.indexOf(24) !== -1 ? true:false}
                checkedIcon={<Check className={classes.checkedIcon} />}
                icon={<Check className={classes.uncheckedIcon} />}
                classes={{
                  checked: classes.checked,
                  root: classes.checkRoot
                }}
              />
            }
            classes={{
              label: classes.label,
              disabled: classes.disabledCheckboxAndRadio
            }}
            label="Disabled Checked"
          />
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(CheckboxExample);`;
const codeExampleRadios = `import React from 'react';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// @material-ui/icons
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
// core components
import styles from "assets/jss/material-kit-pro-react/customCheckboxRadioSwitchStyle.jsx";

class RadioExample extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      selectedEnabled: "b"
    };
    this.handleChangeEnabled = this.handleChangeEnabled.bind(this);
  }
  handleChangeEnabled(event) {
    this.setState({ selectedEnabled: event.target.value });
  }
  render(){
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.checkboxAndRadio + " " + classes.checkboxAndRadioHorizontal}>
          <FormControlLabel
            control={
              <Radio
                checked={this.state.selectedEnabled === "a"}
                onChange={this.handleChangeEnabled}
                value="a"
                name="radio button enabled"
                aria-label="A"
                icon={<FiberManualRecord className={classes.radioUnchecked}/>}
                checkedIcon={<FiberManualRecord className={classes.radioChecked}/>}
                classes={{
                  checked: classes.radio,
                  root: classes.radioRoot
                }}
              />
            }
            classes={{
              label: classes.label
            }}
            label="First Radio"
          />
        </div>
        <div className={classes.checkboxAndRadio + " " + classes.checkboxAndRadioHorizontal}>
          <FormControlLabel
            control={
              <Radio
                checked={this.state.selectedEnabled === "b"}
                onChange={this.handleChangeEnabled}
                value="b"
                name="radio button enabled"
                aria-label="B"
                icon={<FiberManualRecord className={classes.radioUnchecked}/>}
                checkedIcon={<FiberManualRecord className={classes.radioChecked}/>}
                classes={{
                  checked: classes.radio,
                  root: classes.radioRoot
                }}
              />
            }
            classes={{
              label: classes.label
            }}
            label="Second Radio"
          />
        </div>
        <div className={classes.checkboxAndRadio + " " + classes.checkboxAndRadioHorizontal}>
          <FormControlLabel
            disabled
            control={
              <Radio
                checked={false}
                value="a"
                name="radio button disabled"
                aria-label="B"
                icon={<FiberManualRecord className={classes.radioUnchecked}/>}
                checkedIcon={<FiberManualRecord className={classes.radioChecked}/>}
                classes={{
                  checked: classes.radio,
                  disabled: classes.disabledCheckboxAndRadio,
                  root: classes.radioRoot
                }}
              />
            }
            classes={{
              label: classes.label
            }}
            label="Disabled Unchecked Radio"
          />
        </div>
        <div className={classes.checkboxAndRadio + " " + classes.checkboxAndRadioHorizontal}>
          <FormControlLabel
            disabled
            control={
              <Radio
                checked={true}
                value="b"
                name="radio button disabled"
                aria-label="B"
                icon={<FiberManualRecord className={classes.radioUnchecked}/>}
                checkedIcon={<FiberManualRecord className={classes.radioChecked}/>}
                classes={{
                  checked: classes.radio,
                  disabled: classes.disabledCheckboxAndRadio,
                  root: classes.radioRoot
                }}
              />
            }
            classes={{label: classes.label}}
            label="Disabled Checked Radio"
          />
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(RadioExample);`;
const codeExampleSwitches = `import React from 'react';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// core components
import styles from "assets/jss/material-kit-pro-react/customCheckboxRadioSwitchStyle.jsx";

class SwitchExample extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      checkedA: true,
      checkedB: false,
    };
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  render(){
    const { classes } = this.props;
    return (
      <div>
        <div>
          <FormControlLabel
            control={
              <Switch
                checked={this.state.checkedA}
                onChange={this.handleChange("checkedA")}
                value="checkedA"
                classes={{
                  switchBase: classes.switchBase,
                  checked: classes.switchChecked,
                  icon: classes.switchIcon,
                  iconChecked: classes.switchIconChecked,
                  bar: classes.switchBar
                }}
              />
            }
            classes={{
              label: classes.label
            }}
            label="Toggle is on"
          />
        </div>
        <div>
          <FormControlLabel
            control={
              <Switch
                checked={this.state.checkedB}
                onChange={this.handleChange("checkedB")}
                value="checkedB"
                classes={{
                  switchBase: classes.switchBase,
                  checked: classes.switchChecked,
                  icon: classes.switchIcon,
                  iconChecked: classes.switchIconChecked,
                  bar: classes.switchBar
                }}
              />
            }
            classes={{
              label: classes.label
            }}
            label="Toggle is off"
          />
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(SwitchExample);`;

class CheckboxRadioSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [24, 22],
      selectedEnabled: "b",
      checkedA: true,
      checkedB: false
    };
    this.handleChangeEnabled = this.handleChangeEnabled.bind(this);
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  handleChangeEnabled(event) {
    this.setState({ selectedEnabled: event.target.value });
  }
  handleToggle(value) {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <h1>Checkboxes, Radios and Switches</h1>
        <p>
          We haven't extended{" "}
          {
            " "
            // eslint-disable-next-line
          }
          <a
            href="https://material-ui-next.com/demos/selection-controls/"
            target="_blank"
          >
            these components from Material-UI
          </a>
          . We've just added our style over their components.
        </p>
        <p>
          To use our styles over any of these three components you need the
          following import:
        </p>
        <SyntaxHighlighter language="jsx" style={prism}>
          {codeImport}
        </SyntaxHighlighter>
        <p>Let's take a look at each one of them, and how to use our styles.</p>
        <h2>Checkboxes</h2>
        <div className="border-example">
          <div
            className={
              classes.checkboxAndRadio +
              " " +
              classes.checkboxAndRadioHorizontal
            }
          >
            <FormControlLabel
              control={
                <Checkbox
                  tabIndex={-1}
                  onClick={() => this.handleToggle(21)}
                  checkedIcon={<Check className={classes.checkedIcon} />}
                  icon={<Check className={classes.uncheckedIcon} />}
                  classes={{
                    checked: classes.checked,
                    root: classes.checkRoot
                  }}
                />
              }
              classes={{ label: classes.label }}
              label="Unchecked"
            />
          </div>
          <div
            className={
              classes.checkboxAndRadio +
              " " +
              classes.checkboxAndRadioHorizontal
            }
          >
            <FormControlLabel
              control={
                <Checkbox
                  tabIndex={-1}
                  onClick={() => this.handleToggle(22)}
                  checked={this.state.checked.indexOf(22) !== -1 ? true : false}
                  checkedIcon={<Check className={classes.checkedIcon} />}
                  icon={<Check className={classes.uncheckedIcon} />}
                  classes={{
                    checked: classes.checked,
                    root: classes.checkRoot
                  }}
                />
              }
              classes={{ label: classes.label }}
              label="Checked"
            />
          </div>
          <div
            className={
              classes.checkboxAndRadio +
              " " +
              classes.checkboxAndRadioHorizontal
            }
          >
            <FormControlLabel
              disabled
              control={
                <Checkbox
                  tabIndex={-1}
                  checkedIcon={<Check className={classes.checkedIcon} />}
                  icon={<Check className={classes.uncheckedIcon} />}
                  classes={{
                    checked: classes.checked,
                    root: classes.checkRoot
                  }}
                />
              }
              classes={{
                label: classes.label,
                disabled: classes.disabledCheckboxAndRadio
              }}
              label="Disabled Unchecked"
            />
          </div>
          <div
            className={
              classes.checkboxAndRadio +
              " " +
              classes.checkboxAndRadioHorizontal
            }
          >
            <FormControlLabel
              disabled
              control={
                <Checkbox
                  tabIndex={-1}
                  checked={this.state.checked.indexOf(24) !== -1 ? true : false}
                  checkedIcon={<Check className={classes.checkedIcon} />}
                  icon={<Check className={classes.uncheckedIcon} />}
                  classes={{
                    checked: classes.checked,
                    root: classes.checkRoot
                  }}
                />
              }
              classes={{
                label: classes.label,
                disabled: classes.disabledCheckboxAndRadio
              }}
              label="Disabled Checked"
            />
          </div>
          <Accordion
            collapses={[
              {
                title: "View Code",
                content: (
                  <SyntaxHighlighter language="jsx" style={prism}>
                    {codeExampleCheckboxes}
                  </SyntaxHighlighter>
                )
              }
            ]}
          />
        </div>
        <h2>Radios</h2>
        <div className="border-example">
          <div
            className={
              classes.checkboxAndRadio +
              " " +
              classes.checkboxAndRadioHorizontal
            }
          >
            <FormControlLabel
              control={
                <Radio
                  checked={this.state.selectedEnabled === "a"}
                  onChange={this.handleChangeEnabled}
                  value="a"
                  name="radio button enabled"
                  aria-label="A"
                  icon={
                    <FiberManualRecord className={classes.radioUnchecked} />
                  }
                  checkedIcon={
                    <FiberManualRecord className={classes.radioChecked} />
                  }
                  classes={{
                    checked: classes.radio,
                    root: classes.radioRoot
                  }}
                />
              }
              classes={{
                label: classes.label
              }}
              label="First Radio"
            />
          </div>
          <div
            className={
              classes.checkboxAndRadio +
              " " +
              classes.checkboxAndRadioHorizontal
            }
          >
            <FormControlLabel
              control={
                <Radio
                  checked={this.state.selectedEnabled === "b"}
                  onChange={this.handleChangeEnabled}
                  value="b"
                  name="radio button enabled"
                  aria-label="B"
                  icon={
                    <FiberManualRecord className={classes.radioUnchecked} />
                  }
                  checkedIcon={
                    <FiberManualRecord className={classes.radioChecked} />
                  }
                  classes={{
                    checked: classes.radio,
                    root: classes.radioRoot
                  }}
                />
              }
              classes={{
                label: classes.label
              }}
              label="Second Radio"
            />
          </div>
          <div
            className={
              classes.checkboxAndRadio +
              " " +
              classes.checkboxAndRadioHorizontal
            }
          >
            <FormControlLabel
              disabled
              control={
                <Radio
                  checked={false}
                  value="a"
                  name="radio button disabled"
                  aria-label="B"
                  icon={
                    <FiberManualRecord className={classes.radioUnchecked} />
                  }
                  checkedIcon={
                    <FiberManualRecord className={classes.radioChecked} />
                  }
                  classes={{
                    checked: classes.radio,
                    disabled: classes.disabledCheckboxAndRadio,
                    root: classes.radioRoot
                  }}
                />
              }
              classes={{
                label: classes.label
              }}
              label="Disabled Unchecked Radio"
            />
          </div>
          <div
            className={
              classes.checkboxAndRadio +
              " " +
              classes.checkboxAndRadioHorizontal
            }
          >
            <FormControlLabel
              disabled
              control={
                <Radio
                  checked={true}
                  value="b"
                  name="radio button disabled"
                  aria-label="B"
                  icon={
                    <FiberManualRecord className={classes.radioUnchecked} />
                  }
                  checkedIcon={
                    <FiberManualRecord className={classes.radioChecked} />
                  }
                  classes={{
                    checked: classes.radio,
                    disabled: classes.disabledCheckboxAndRadio,
                    root: classes.radioRoot
                  }}
                />
              }
              classes={{ label: classes.label }}
              label="Disabled Checked Radio"
            />
          </div>
          <Accordion
            collapses={[
              {
                title: "View Code",
                content: (
                  <SyntaxHighlighter language="jsx" style={prism}>
                    {codeExampleRadios}
                  </SyntaxHighlighter>
                )
              }
            ]}
          />
        </div>
        <h2>Switches</h2>
        <div className="border-example">
          <div>
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.checkedA}
                  onChange={this.handleChange("checkedA")}
                  value="checkedA"
                  classes={{
                    switchBase: classes.switchBase,
                    checked: classes.switchChecked,
                    icon: classes.switchIcon,
                    iconChecked: classes.switchIconChecked,
                    bar: classes.switchBar
                  }}
                />
              }
              classes={{
                label: classes.label
              }}
              label="Toggle is on"
            />
          </div>
          <div>
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.checkedB}
                  onChange={this.handleChange("checkedB")}
                  value="checkedB"
                  classes={{
                    switchBase: classes.switchBase,
                    checked: classes.switchChecked,
                    icon: classes.switchIcon,
                    iconChecked: classes.switchIconChecked,
                    bar: classes.switchBar
                  }}
                />
              }
              classes={{
                label: classes.label
              }}
              label="Toggle is off"
            />
          </div>
          <Accordion
            collapses={[
              {
                title: "View Code",
                content: (
                  <SyntaxHighlighter language="jsx" style={prism}>
                    {codeExampleSwitches}
                  </SyntaxHighlighter>
                )
              }
            ]}
          />
        </div>
        <h2>Props</h2>
        <p>
          For more info you can check out these links which will redirect you to
          the official Material-ui documentation:{" "}
          <a href="https://material-ui.com/api/checkbox/">Checkbox</a>,{" "}
          <a href="https://material-ui.com/api/radio/">Radio</a>,{" "}
          <a href="https://material-ui.com/api/switch/">Switch</a>.
        </p>
      </div>
    );
  }
}

export default withStyles(styles)(CheckboxRadioSwitch);
