import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
// material-ui icons
import Close from "@material-ui/icons/Close";
import Remove from "@material-ui/icons/Remove";
import Add from "@material-ui/icons/Add";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
// core components
import Table from "components/Table/Table.jsx";
import Button from "components/CustomButtons/Button.jsx";

import style from "assets/jss/material-kit-pro-react/views/componentsSections/contentAreas.jsx";

import product1 from "assets/img/product1.jpg";

function Tables(props) {
  const { classes } = props;
  return (
    <Table
      tableHead={["", "PRODUCT", "COLOR", "SIZE", "PRICE", "QTY", "AMOUNT", ""]}
      tableData={[
        [
          <div className={classes.imgContainer}>
            <img src={product1} alt="..." className={classes.img} />
          </div>,
          <span>
            <a href="#jacket" className={classes.tdNameAnchor}>
              Spring Jacket
            </a>
            <br />
            <small className={classes.tdNameSmall}>by Dolce&amp;Gabbana</small>
          </span>,
          "Red",
          "M",
          <span>
            <small className={classes.tdNumberSmall}>€</small> 549
          </span>,
          <span>
            1{` `}
            <div className={classes.buttonGroup}>
              <Button
                color="info"
                size="sm"
                round
                className={classes.firstButton}
              >
                <Remove />
              </Button>
              <Button
                color="info"
                size="sm"
                round
                className={classes.lastButton}
              >
                <Add />
              </Button>
            </div>
          </span>,
          <span>
            <small className={classes.tdNumberSmall}>€</small> 549
          </span>,
          <Tooltip
            id="close1"
            title="Remove item"
            placement="left"
            classes={{ tooltip: classes.tooltip }}
          >
            <Button link className={classes.actionButton}>
              <Close />
            </Button>
          </Tooltip>
        ],
        {
          purchase: true,
          colspan: "3",
          amount: (
            <span>
              <small>€</small>2,346
            </span>
          ),
          col: {
            colspan: 3,
            text: (
              <Button color="info" round>
                Complete Purchase <KeyboardArrowRight />
              </Button>
            )
          }
        }
      ]}
      tableShopping
      customHeadCellClasses={[
        classes.textCenter,
        classes.description,
        classes.description,
        classes.textRight,
        classes.textRight,
        classes.textRight
      ]}
      customHeadClassesForCells={[0, 2, 3, 4, 5, 6]}
      customCellClasses={[
        classes.tdName,
        classes.customFont,
        classes.customFont,
        classes.tdNumber,
        classes.tdNumber + " " + classes.tdNumberAndButtonGroup,
        classes.tdNumber + " " + classes.textCenter
      ]}
      customClassesForCells={[1, 2, 3, 4, 5, 6]}
    />
  );
}

export default withStyles(style)(Tables);
