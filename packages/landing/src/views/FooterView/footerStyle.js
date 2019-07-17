const footerStyle = theme => ({

  selectMenu: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 32
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

export default footerStyle;
