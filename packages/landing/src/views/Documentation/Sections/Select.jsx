/*eslint-disable*/
import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter/prism";
import { prism } from "react-syntax-highlighter/styles/prism";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import styles from "assets/jss/material-kit-pro-react/customSelectStyle.jsx";

const codeExample = `import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { prism } from 'react-syntax-highlighter/styles/prism';
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import styles from "assets/jss/material-kit-pro-react/customSelectStyle.jsx";

class Example extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      simpleSelect: "",
      multipleSelect: [],
    };
  }
  handleSimple = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleMultiple = event => {
    this.setState({ multipleSelect: event.target.value });
  };
  render(){
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={6} md={5} lg={5}>
          <FormControl
            fullWidth
            className={classes.selectFormControl}>
            <InputLabel
              htmlFor="simple-select"
              className={classes.selectLabel}>
              Single Value Select
            </InputLabel>
            <Select
              MenuProps={{
                className: classes.selectMenu
              }}
              classes={{
                select: classes.select
              }}
              value={this.state.simpleSelect}
              onChange={this.handleSimple}
              inputProps={{
                name: "simpleSelect",
                id: "simple-select"
              }}>
              <MenuItem
                disabled
                classes={{
                  root: classes.selectMenuItem
                }}>
                Multiple Select
              </MenuItem>
              <MenuItem
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected
                }}
                value="2">
                Paris
              </MenuItem>
              <MenuItem
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected
                }}
                value="3">
                Bucharest
              </MenuItem>
              <MenuItem
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected
                }}
                value="4">
                Rome
              </MenuItem>
            </Select>
          </FormControl>
        </GridItem>
        <GridItem xs={12} sm={6} md={5} lg={5}>
          <FormControl
            fullWidth
            className={classes.selectFormControl}>
            <InputLabel
              htmlFor="multiple-select"
              className={classes.selectLabel}>
              Multiple Value Select
            </InputLabel>
            <Select
              multiple
              value={this.state.multipleSelect}
              onChange={this.handleMultiple}
              MenuProps={{ className: classes.selectMenu }}
              classes={{ select: classes.select }}
              inputProps={{
                name: "multipleSelect",
                id: "multiple-select"
              }}>
              <MenuItem
                disabled
                classes={{
                  root: classes.selectMenuItem
                }}>
                Multiple Select
              </MenuItem>
              <MenuItem
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected
                }}
                value="2">
                Paris
              </MenuItem>
              <MenuItem
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected
                }}
                value="3">
                Bucharest
              </MenuItem>
              <MenuItem
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected
                }}
                value="4">
                Rome
              </MenuItem>
            </Select>
          </FormControl>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(Example);
`;

class Selects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      simpleSelect: "",
      multipleSelect: []
    };
  }
  handleSimple = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleMultiple = event => {
    this.setState({ multipleSelect: event.target.value });
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <h1>Select</h1>
        <p>
          We've decided to leave this component as is from{" "}
          {
            " "
            // eslint-disable-next-line
          }
          <a href="https://material-ui-next.com/demos/selects/" target="_blank">
            material-ui selects component
          </a>{" "}
          and just add our style to them.
        </p>
        <h2>Styles</h2>
        <p>
          You will find the styles for this component in
          <br />{" "}
          <code>
            src/assets/jss/material-kit-pro-react/customSelectStyle.jsx
          </code>
          .
        </p>
        <h2>Example</h2>
        <GridContainer>
          <GridItem xs={12} sm={6} md={5} lg={5}>
            <FormControl fullWidth className={classes.selectFormControl}>
              <InputLabel
                htmlFor="simple-select"
                className={classes.selectLabel}
              >
                Single Value Select
              </InputLabel>
              <Select
                MenuProps={{
                  className: classes.selectMenu
                }}
                classes={{
                  select: classes.select
                }}
                value={this.state.simpleSelect}
                onChange={this.handleSimple}
                inputProps={{
                  name: "simpleSelect",
                  id: "simple-select"
                }}
              >
                <MenuItem
                  disabled
                  classes={{
                    root: classes.selectMenuItem
                  }}
                >
                  Multiple Select
                </MenuItem>
                <MenuItem
                  classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                  }}
                  value="2"
                >
                  Paris
                </MenuItem>
                <MenuItem
                  classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                  }}
                  value="3"
                >
                  Bucharest
                </MenuItem>
                <MenuItem
                  classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                  }}
                  value="4"
                >
                  Rome
                </MenuItem>
              </Select>
            </FormControl>
          </GridItem>
          <GridItem xs={12} sm={6} md={5} lg={5}>
            <FormControl fullWidth className={classes.selectFormControl}>
              <InputLabel
                htmlFor="multiple-select"
                className={classes.selectLabel}
              >
                Multiple Value Select
              </InputLabel>
              <Select
                multiple
                value={this.state.multipleSelect}
                onChange={this.handleMultiple}
                MenuProps={{ className: classes.selectMenu }}
                classes={{ select: classes.select }}
                inputProps={{
                  name: "multipleSelect",
                  id: "multiple-select"
                }}
              >
                <MenuItem
                  disabled
                  classes={{
                    root: classes.selectMenuItem
                  }}
                >
                  Multiple Select
                </MenuItem>
                <MenuItem
                  classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                  }}
                  value="2"
                >
                  Paris
                </MenuItem>
                <MenuItem
                  classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                  }}
                  value="3"
                >
                  Bucharest
                </MenuItem>
                <MenuItem
                  classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                  }}
                  value="4"
                >
                  Rome
                </MenuItem>
              </Select>
            </FormControl>
          </GridItem>
        </GridContainer>
        <SyntaxHighlighter language="jsx" style={prism}>
          {codeExample}
        </SyntaxHighlighter>
      </div>
    );
  }
}

export default withStyles(styles)(Selects);
