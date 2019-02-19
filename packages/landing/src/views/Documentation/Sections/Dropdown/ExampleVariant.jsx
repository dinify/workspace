import React from "react";
// @material-ui/core components
// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";

const Dropdown = props => {
  return (
    <div>
      <CustomDropdown
        buttonText="Primary"
        buttonProps={{
          color: "primary"
        }}
        dropdownList={[
          "Action",
          "Another action",
          "Something else here",
          { divider: true },
          "Separated link"
        ]}
      />
      <CustomDropdown
        buttonText="Secondary"
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
      <CustomDropdown
        buttonText="Success"
        buttonProps={{
          color: "success"
        }}
        dropdownList={[
          "Action",
          "Another action",
          "Something else here",
          { divider: true },
          "Separated link"
        ]}
      />
      <CustomDropdown
        buttonText="Info"
        buttonProps={{
          color: "info"
        }}
        dropdownList={[
          "Action",
          "Another action",
          "Something else here",
          { divider: true },
          "Separated link"
        ]}
      />
      <CustomDropdown
        buttonText="Warning"
        buttonProps={{
          color: "warning"
        }}
        dropdownList={[
          "Action",
          "Another action",
          "Something else here",
          { divider: true },
          "Separated link"
        ]}
      />
      <CustomDropdown
        buttonText="Danger"
        buttonProps={{
          color: "danger"
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
  );
};

export default Dropdown;
