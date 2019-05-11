import {
  container,
  title,
  main,
  whiteColor,
  mainRaised
} from "assets/jss/material-kit-pro-react.jsx";

const landingPageStyle = theme => ({
  container: {
    color: "rgba(255, 255, 255, 1)",
    ...container,
    zIndex: "2"
  },
  contrastText: {
    color: '#ffffff',
    fill: '#ffffff'
  },
  button2: theme.typography.button2,
  main: {
    ...main
  },
  mainBottomSheet: {
    marginTop: -20,
    borderRadius: theme.shape.borderRadius,
    overflow: "hidden"
  },
  bottomSheetGrip: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    paddingTop: 8,
    paddingBottom: 8,
    marginBottom: -24,
    "&:after": {
      content: '""',
      width: 40,
      height: 4,
      borderRadius: 2,
      backgroundColor: theme.palette.action.disabled
    }
  },
  mainRaised: {
    ...mainRaised
  },
  hideSmall: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  block: {
    color: "inherit",
    padding: "0.9375rem",
    fontWeight: "500",
    fontSize: "12px",
    textTransform: "uppercase",
    borderRadius: "3px",
    textDecoration: "none",
    position: "relative",
    display: "block"
  },
  inlineBlock: {
    display: "inline-block",
    padding: "0px",
    width: "auto"
  },
  list: {
    marginBottom: "0",
    padding: "0",
    marginTop: "0"
  },
  left: {
    float: "left!important",
    display: "block"
  },
  right: {
    padding: "15px 0",
    margin: "0",
    float: "right"
  },
  icon: {
    width: "18px",
    height: "18px",
    top: "3px",
    position: "relative"
  }
});

export default landingPageStyle;
