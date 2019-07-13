import {
  container
} from "styles/material-kit-pro-react.jsx";

const restaurantsPageStyle = theme => ({
  container: {
    color: "rgba(255, 255, 255, 1)",
    ...container,
    zIndex: "2"
  },
  section: {
    padding: "56px 0",
    textAlign: "center"
  },
  lightBg: {
    backgroundColor: theme.palette.background.paper
  },
  heroImg: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat"
  },
  darkScrim: {
    "&:before": {
      backgroundColor: theme.palette.action.active
    },
    "&:after,&:before": {
      position: "absolute",
      zIndex: "1",
      width: "100%",
      height: "100%",
      display: "block",
      left: "0",
      top: "0",
      content: "''"
    }
  }
});

export default restaurantsPageStyle;
