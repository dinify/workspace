import React from "react";
// @material-ui/core components
// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";

const Dropdown = props => {
  return (
    <div>
      <CustomDropdown
        dropdownHeader="Dropdown header"
        buttonText="Dropdown Link"
        buttonProps={{
          href: "#pablo"
        }}
        dropdownList={[
          "Action",
          "Another action",
          "Something else here",
          { divider: true },
          "Separated link",
          { divider: true },
          "One more separated link"
        ]}
      />
    </div>
  );
};

export default Dropdown;
