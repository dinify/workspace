import React from "react";
// @material-ui/core components
// @material-ui/icons
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";

class Example extends React.Component {
  render() {
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={8} lg={6}>
          <CustomDropdown
            dropdownHeader="Dropdown header"
            buttonText="Multilevel Dropdown"
            buttonProps={{
              round: true,
              block: true,
              color: "info"
            }}
            dropPlacement="bottom-start"
            dropdownList={[
              "Action",
              "Another action",
              "Something else here",
              { divider: true },
              "Separated link",
              { divider: true },
              "One more separated link",
              <CustomDropdown
                ref="multi"
                innerDropDown
                buttonText="Submenu"
                buttonProps={{
                  simple: true,
                  block: true
                }}
                dropPlacement="right-start"
                dropdownList={[
                  "Submenu action",
                  "Submenu action",
                  <CustomDropdown
                    ref="multi"
                    innerDropDown
                    buttonText="Second submenu"
                    buttonProps={{
                      simple: true
                    }}
                    dropPlacement="right-start"
                    dropdownList={["Submenu action 1", "Submenu action 2"]}
                  />
                ]}
              />
            ]}
          />
        </GridItem>
      </GridContainer>
    );
  }
}

export default Example;
