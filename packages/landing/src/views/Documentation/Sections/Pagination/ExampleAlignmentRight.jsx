import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Pagination from "components/Pagination/Pagination.jsx";

const styles = {
  justifyContentEnd: {
    "& > ul": {
      justifyContent: "flex-end!important"
    }
  }
};

const PaginationDocs = props => {
  const { classes } = props;
  return (
    <div className={classes.justifyContentEnd}>
      <Pagination
        pages={[
          { text: "Previous" },
          { text: 1 },
          { text: 2 },
          { text: 3 },
          { text: "Next" }
        ]}
      />
    </div>
  );
};

export default withStyles(styles)(PaginationDocs);
