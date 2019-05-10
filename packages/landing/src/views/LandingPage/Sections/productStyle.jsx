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
  title: {
    ...title,
    textAlign: "center",
    marginBottom: "1rem",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none"
  },
  description: {
    color: grayColor[0],
  },
  demoContainer: {
    position: "relative",
    height: "600px",
    width: "355px",
    margin: "0 auto"
  },
  iphoneImg: {
    position: "absolute",
    height: "600px",
    width: "355px",
    top: 0,
    left: 0
  },
  featureImg: {
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
    width: '232px',
    height: '193px',
    fontSize: "10px",
    lineHeight: "12px",
    padding: "10px"
  },
  featuresImg: {
    width: "100%"
  }
});

export default productStyle;
