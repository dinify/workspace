import React from "react";
// import { Grid } from "@material-ui/core";
import { Switch, Route, Redirect } from "react-router-dom";

import DocHeader from "./DocHeader/DocHeader";
import DocSidebar from "./DocSidebar/DocSidebar";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import docRoutes from "documentation.js";

import "./docStyle.css";

class Documentation extends React.Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: "#FFFFFF",
          height: "100vh",
          overflowX: "hidden"
        }}
      >
        <DocHeader />
        <GridContainer>
          <GridItem
            xs={12}
            sm={12}
            md={3}
            lg={2}
            xl={2}
            style={{ marginTop: "75px", marginBottom: "75px" }}
          >
            <DocSidebar routes={docRoutes} {...this.props} />
          </GridItem>
          <GridItem
            xs={12}
            sm={12}
            md={9}
            lg={8}
            xl={8}
            style={{ marginTop: "75px", marginBottom: "75px" }}
          >
            <Switch>
              {docRoutes.map((prop, key) => {
                if (prop.redirect)
                  return (
                    <Redirect from={prop.path} to={prop.pathTo} key={key} />
                  );
                return prop.routes.map((prop, key) => {
                  return (
                    <Route
                      path={prop.path}
                      component={prop.component}
                      key={key}
                    />
                  );
                });
              })}
            </Switch>
          </GridItem>
          <GridItem
            xs={12}
            sm={12}
            md={2}
            lg={2}
            xl={2}
            style={{ marginTop: "75px" }}
          />
        </GridContainer>
      </div>
    );
  }
}

export default Documentation;
