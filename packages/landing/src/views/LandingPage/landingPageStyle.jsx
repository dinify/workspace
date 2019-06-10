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
    marginTop: -56,
    borderRadius: theme.shape.borderRadius,
    overflow: "hidden"
  },
  bottomSheetGrip: {
    transition: theme.transitions.create(["opacity"], {
      duration: theme.transitions.duration.shortest / 2
    }),
    WebkitTransition: theme.transitions.create(["opacity"], {
      duration: theme.transitions.duration.shortest / 2
    }),
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
  },
  heroSection: {
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundSize: "cover",
    boxSizing: "border-box",
    width: "100%",
    height: "100vh"
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
  },
  overflow: {
    position: "relative",
    width: "100%",
    height: "100vh",
    overflowX: "hidden",
    overflowY: "scroll",
    WebkitOverflowScrolling: "touch"
  },
  perspective: {
    perspective: "1px",
    perspectiveOrigin: "0 0"
  },
  preserve: {
    transformStyle: "preserve-3d",
    WebkitTransformStyle: "preserve-3d",
    position: "relative"
  },
  stickyFixA: {
    position: "sticky"
  },
  stickyFixB: {
    position: "-webkit-sticky",
    top: "0px"
  },
  parallaxSpeed1: {
    transformOrigin: "0 0",
    transform: "translate3d(0, 0, -1px) scale(2)",
    WebkitTransform: "translate3d(0, 0, -1px) scale(2)"
  },
  stickyOffset: {
    position: "-webkit-sticky",
    top: "24px"
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
    backgroundColor: 'rgba(255,255,255,0.2)'
  }
});

export default landingPageStyle;
