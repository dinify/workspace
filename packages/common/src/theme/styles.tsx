import React, { useContext } from 'react';
import { Helmet } from "react-helmet";
import { withStyles } from "@material-ui/core";

export const StyleContext = React.createContext({});

export const StyleProvider = ({ children }: React.PropsWithChildren<any>) => {
  // const HOC = ({ children }: React.PropsWithChildren<any>) => (
  //   withStyles()(children);
  // );
  return <StyleContext.Provider value={{

  }}>
    <Helmet>
      <style>
        {/* {generated} */}
      </style>
    </Helmet>
    {children}
  </StyleContext.Provider>
};

export const useStyles = () => {
  return useContext(StyleContext);
};