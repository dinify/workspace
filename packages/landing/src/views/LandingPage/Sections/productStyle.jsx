import { title, grayColor } from "assets/jss/material-kit-pro-react.jsx";

const productStyle = {
  section: {
    padding: "70px 0",
    textAlign: "left"
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
    color: grayColor[0]
  },
  iphoneImg: {
    //width: "100%",
    maxHeight: "600px"
  },
  demoContainer: {
    position: "relative"
  },
  demoDescription: {
    position: "absolute",
    background: "#fafafa",
    top: "295px",
    left: "133px",
    height: "70px",
    width: "210px",
    fontSize: "10px",
    lineHeight: "11px"
  }
};

export default productStyle;
