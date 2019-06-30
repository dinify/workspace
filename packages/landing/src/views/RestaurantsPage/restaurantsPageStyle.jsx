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
  }
});

export default restaurantsPageStyle;
