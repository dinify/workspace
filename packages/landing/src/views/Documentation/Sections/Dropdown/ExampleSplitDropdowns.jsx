import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import Button from "components/CustomButtons/Button.jsx";

import buttonGroupStyle from "assets/jss/material-kit-pro-react/buttonGroupStyle.jsx";

const Dropdown = props => {
  const { classes } = props;
  return (
    <div>
      <div className={classes.buttonGroup}>
        <Button color="primary" className={classes.firstButton}>
          PRIMARY
        </Button>
        <CustomDropdown
          buttonProps={{
            color: "primary",
            className: classes.lastButton
          }}
          dropdownList={[
            "Action",
            "Another action",
            "Something else here",
            { divider: true },
            "Separated link"
          ]}
        />
      </div>
      <div className={classes.buttonGroup}>
        <Button color="secondary" className={classes.firstButton}>
          Secondary
        </Button>
        <CustomDropdown
          hoverColor="dark"
          buttonProps={{
            color: "secondary",
            className: classes.lastButton
          }}
          dropdownList={[
            "Action",
            "Another action",
            "Something else here",
            { divider: true },
            "Separated link"
          ]}
        />
      </div>
      <div className={classes.buttonGroup}>
        <Button color="success" className={classes.firstButton}>
          Success
        </Button>
        <CustomDropdown
          hoverColor="success"
          buttonProps={{
            color: "success",
            className: classes.lastButton
          }}
          dropdownList={[
            "Action",
            "Another action",
            "Something else here",
            { divider: true },
            "Separated link"
          ]}
        />
      </div>
      <div className={classes.buttonGroup}>
        <Button color="info" className={classes.firstButton}>
          Info
        </Button>
        <CustomDropdown
          hoverColor="info"
          buttonProps={{
            color: "info",
            className: classes.lastButton
          }}
          dropdownList={[
            "Action",
            "Another action",
            "Something else here",
            { divider: true },
            "Separated link"
          ]}
        />
      </div>
      <div className={classes.buttonGroup}>
        <Button color="warning" className={classes.firstButton}>
          Warning
        </Button>
        <CustomDropdown
          hoverColor="warning"
          buttonProps={{
            color: "warning",
            className: classes.lastButton
          }}
          dropdownList={[
            "Action",
            "Another action",
            "Something else here",
            { divider: true },
            "Separated link"
          ]}
        />
      </div>
      <div className={classes.buttonGroup}>
        <Button color="danger" className={classes.firstButton}>
          Danger
        </Button>
        <CustomDropdown
          hoverColor="danger"
          buttonProps={{
            color: "danger",
            className: classes.lastButton
          }}
          dropdownList={[
            "Action",
            "Another action",
            "Something else here",
            { divider: true },
            "Separated link"
          ]}
        />
      </div>
    </div>
  );
};

export default withStyles(buttonGroupStyle)(Dropdown);
