import {
  primaryColor,
  secondaryColor,
  warningColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor
} from "styles/material-kit-pro-react.jsx";

const accordionStyle = theme => ({
  root: {
    flexGrow: 1,
    marginBottom: "20px"
  },
  expansionPanel: {
    boxShadow: "none",
    "&:before": {
      display: "none !important"
    }
  },
  expansionPanelExpanded: {
    margin: "0",
    marginBottom: "16px"
  },
  expansionPanelSummary: {
    minHeight: "auto !important",
    backgroundColor: "transparent",
    padding: "16px 16px 16px 0px",
    borderTopLeftRadius: "4px",
    borderTopRightRadius: "4px"
  },
  dividerTop: {
    borderTop: "1px solid " + theme.palette.divider
  },
  primaryExpansionPanelSummary: {
    "&:hover": {
      color: primaryColor[0]
    }
  },
  secondaryExpansionPanelSummary: {
    "&:hover": {
      color: secondaryColor[0]
    }
  },
  warningExpansionPanelSummary: {
    "&:hover": {
      color: warningColor[0]
    }
  },
  dangerExpansionPanelSummary: {
    "&:hover": {
      color: dangerColor[0]
    }
  },
  successExpansionPanelSummary: {
    "&:hover": {
      color: successColor[0]
    }
  },
  infoExpansionPanelSummary: {
    "&:hover": {
      color: infoColor[0]
    }
  },
  roseExpansionPanelSummary: {
    "&:hover": {
      color: roseColor[0]
    }
  },
  expansionPanelSummaryExpaned: {
    "& $expansionPanelSummaryExpandIcon": {
      [theme.breakpoints.up("md")]: {
        top: "auto !important"
      },
      transform: "rotate(180deg)",
      [theme.breakpoints.down("sm")]: {
        top: "10px !important"
      },
      // some jss/css to make the cards look a bit better on Internet Explorer
      "@media all and (-ms-high-contrast: none), (-ms-high-contrast: active)": {
        display: "inline-block !important",
        top: "10px !important"
      }
    }
  },
  primaryExpansionPanelSummaryExpaned: {
    color: primaryColor[0]
  },
  secondaryExpansionPanelSummaryExpaned: {
    color: secondaryColor[0]
  },
  warningExpansionPanelSummaryExpaned: {
    color: warningColor[0]
  },
  dangerExpansionPanelSummaryExpaned: {
    color: dangerColor[0]
  },
  successExpansionPanelSummaryExpaned: {
    color: successColor[0]
  },
  infoExpansionPanelSummaryExpaned: {
    color: infoColor[0]
  },
  roseExpansionPanelSummaryExpaned: {
    color: roseColor[0]
  },
  expansionPanelSummaryContent: {
    margin: "0 !important"
  },
  expansionPanelSummaryExpandIcon: {
    [theme.breakpoints.up("md")]: {
      top: "auto !important"
    },
    transform: "rotate(0deg)",
    color: "inherit",
    right: "-2px",
    [theme.breakpoints.down("sm")]: {
      top: "10px !important"
    },
    // some jss/css to make the cards look a bit better on Internet Explorer
    "@media all and (-ms-high-contrast: none), (-ms-high-contrast: active)": {
      display: "inline-block !important"
    }
  },
  expansionPanelSummaryExpandIconExpanded: {},
  title: {
    fontSize: "16px",
    fontWeight: "bolder",
    marginTop: "0",
    marginBottom: "0",
    color: "inherit"
  },
  expansionPanelDetails: {
    display: "block",
    padding: "16px 0px 5px",
    fontSize: ".875rem"
  }
});

export default accordionStyle;
