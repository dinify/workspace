import {
  container,
  title,
  grayColor
} from "assets/jss/material-kit-pro-react.jsx";

const productStyle = theme => ({
  wrapper: {
    margin: 24
  },
  themedBg: {
    backgroundColor: theme.palette.background.default
  },
  outlinedIconButton: {
    color: theme.palette.text.primary,
    border: `2px solid ${theme.palette.text.primary}`
  },
  section: {
    padding: "56px 0",
    textAlign: "center"
  },
  container: {
    ...container
  },
  textCenter: {
    textAlign: "center"
  },
  textArea: {
    marginRight: "16px",
    marginLeft: "16px"
  },
  button2: theme.typography.button2,
  description: {
    color: grayColor[0],
  },
  featureImgContainer: {
    height: 600 - 32,
    width: 293.6 - 32,
    overflow: "hidden",
    borderRadius: 16,
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    margin: "0 0 0 auto",
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto"
    }
  },
  featureImg: {
    margin: -16,
    height: "600px",
    width: "293.6px",
    top: 0,
    left: 0
  },
  demoDescription: {
    position: "absolute",
    background: "#fafafa",
    textAlign: "left",
    top: "310px",
    left: "70px",
    width: "232px",
    height: "193px",
    padding: "10px"
  },
  featuresImg: {
    width: "100%"
  },
  flag: {
    display: "flex",
    flexDirection: "column",
    width: 56,
    height: 56,
    justifyContent: "center",
    borderRadius: "50%",
    overflow: "hidden",
    border: `1px solid transparent`,
    transition: theme.transitions.create(["all"], {
      duration: theme.transitions.duration.shortest / 2,
      easing: "linear"
    })
  },
  flagSelected: {
    border: `1px solid ${theme.palette.action.selected}`,
    backgroundColor: theme.palette.background.paper
  }
});

export default productStyle;
