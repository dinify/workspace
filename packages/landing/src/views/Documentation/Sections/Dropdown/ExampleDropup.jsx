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
      <CustomDropdown
        dropup
        hoverColor="dark"
        buttonText="Dropup"
        buttonProps={{
          color: "secondary"
        }}
        dropdownList={[
          "Action",
          "Another action",
          "Something else here",
          { divider: true },
          "Separated link"
        ]}
      />
      <div className={classes.buttonGroup}>
        <Button color="secondary" className={classes.firstButton}>
          Split dropup
        </Button>
        <CustomDropdown
          dropup
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
    </div>
  );
};

export default withStyles(buttonGroupStyle)(Dropdown);
