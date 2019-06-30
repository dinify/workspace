
const headerLinksStyle = theme => ({
  button2: theme.typography.button2,
  textSecondary: {
    color: theme.palette.text.secondary
  },
  listItem: {
    float: "left",
    color: "inherit",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "auto",
    margin: "0",
    padding: "0",
    paddingLeft: "16px",
    [theme.breakpoints.down("sm")]: {
      "& ul": {
        maxHeight: "400px",
        overflow: "scroll"
      },
      width: "100%"
    }
  }
});

export default headerLinksStyle;
