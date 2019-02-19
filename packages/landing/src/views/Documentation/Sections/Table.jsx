import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter/prism";
import { prism } from "react-syntax-highlighter/styles/prism";
// @material-ui/core components
// material-ui icons
// core components
// code examples
import TableWithActions from "./Table/TableWithActions.jsx";
import TableWithCheckboxes from "./Table/TableWithCheckboxes.jsx";
import ShoppingCart from "./Table/ShoppingCart.jsx";

const exampleTableWithActions = `import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// material-ui icons
import Person from "@material-ui/icons/Person";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
// core components
import Table from "components/Table/Table.jsx";
import Button from "components/CustomButtons/Button.jsx";

import style from "assets/jss/material-kit-pro-react/views/componentsSections/contentAreas.jsx";

function Tables(props){
    const { classes } = props;
    const fillButtons = [
      { color: "info", icon: Person },
      { color: "success", icon: Edit },
      { color: "danger", icon: Close }
    ].map((prop, key) => {
      return (
        <Button justIcon size="sm" color={prop.color} key={key}>
          <prop.icon />
        </Button>
      );
    });
    const simpleButtons = [
      { color: "info", icon: Person },
      { color: "success", icon: Edit },
      { color: "danger", icon: Close }
    ].map((prop, key) => {
      return (
        <Button simple justIcon size="sm" color={prop.color} key={key}>
          <prop.icon />
        </Button>
      );
    });
    const roundButtons = [
      { color: "info", icon: Person },
      { color: "success", icon: Edit },
      { color: "danger", icon: Close }
    ].map((prop, key) => {
      return (
        <Button round justIcon size="sm" color={prop.color} key={key}>
          <prop.icon />
        </Button>
      );
    });
    return (
          <Table
            tableHead={[
              "#",
              "Name",
              "Job Position",
              "Since",
              "Salary",
              "Actions"
            ]}
            tableData={[
              ["1", "Andrew Mike", "Develop", "2013", "€ 99,225", fillButtons],
              ["2", "John Doe", "Design", "2012", "€ 89,241", roundButtons],
              ["3", "Alex Mike", "Design", "2010", "€ 92,144", simpleButtons]
            ]}
            customCellClasses={[
              classes.textCenter,
              classes.textRight,
              classes.textRight
            ]}
            customClassesForCells={[0, 4, 5]}
            customHeadCellClasses={[
              classes.textCenter,
              classes.textRight,
              classes.textRight
            ]}
            customHeadClassesForCells={[0, 4, 5]}
          />
    );
}

export default withStyles(style)(Tables);
`;

const exampleTableWithCheckboxes = `import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Checkbox from "@material-ui/core/Checkbox";
// material-ui icons
import Check from "@material-ui/icons/Check";
// core components
import Table from "components/Table/Table.jsx";

import style from "assets/jss/material-kit-pro-react/views/componentsSections/contentAreas.jsx";

class Tables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [1, 3, 5]
    };
    this.handleToggle = this.handleToggle.bind(this);
  }
  handleToggle(value) {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    this.setState({
      checked: newChecked
    });
  }
  render() {
    const { classes } = this.props;
    return (
      <Table
        striped
        tableHead={["#", "", "Product Name", "Type", "Qty", "Price", "Amount"]}
        tableData={[
          [
            "1",
            <Checkbox
              checked={this.state.checked.indexOf(1) !== -1}
              tabIndex={-1}
              onClick={() => this.handleToggle(1)}
              checkedIcon={<Check className={classes.checkedIcon} />}
              icon={<Check className={classes.uncheckedIcon} />}
              classes={{
                checked: classes.checked,
                root: classes.checkRoot
              }}
            />,
            "Moleskine Agenda",
            "Office",
            "25",
            "€ 49",
            "€ 1,225"
          ],
          [
            "2",
            <Checkbox
              checked={this.state.checked.indexOf(2) !== -1}
              tabIndex={-1}
              onClick={() => this.handleToggle(2)}
              checkedIcon={<Check className={classes.checkedIcon} />}
              icon={<Check className={classes.uncheckedIcon} />}
              classes={{
                checked: classes.checked,
                root: classes.checkRoot
              }}
            />,
            "Stabilo Pen",
            "Office",
            "30",
            "€ 10",
            "€ 300"
          ],
          {
            total: true,
            colspan: "5",
            amount: (
              <span>
                <small>€</small>1,525
              </span>
            )
          }
        ]}
        customCellClasses={[
          classes.textCenter,
          classes.padding0,
          classes.textRight,
          classes.textRight
        ]}
        customClassesForCells={[0, 1, 5, 6]}
        customHeadCellClasses={[
          classes.textCenter,
          classes.textRight,
          classes.textRight
        ]}
        customHeadClassesForCells={[0, 5, 6]}
      />
    );
  }
}

export default withStyles(style)(Tables);
`;

const exampleShoppingCart = `import React from "react";
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
            1{\` \`}
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
`;

const exampleProps = `CustomTable.defaultProps = {
  tableHeaderColor: "gray",
  hover: false,
  colorsColls: [],
  coloredColls: [],
  striped: false,
  customCellClasses: [],
  customClassesForCells: [],
  customHeadCellClasses: [],
  customHeadClassesForCells: []
};

CustomTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  // Of(PropTypes.arrayOf(PropTypes.node)) || Of(PropTypes.object),
  tableData: PropTypes.array,
  hover: PropTypes.bool,
  coloredColls: PropTypes.arrayOf(PropTypes.number),
  // Of(["warning","primary","danger","success","info","rose","gray"]) - colorsColls
  colorsColls: PropTypes.array,
  customCellClasses: PropTypes.arrayOf(PropTypes.string),
  customClassesForCells: PropTypes.arrayOf(PropTypes.number),
  customHeadCellClasses: PropTypes.arrayOf(PropTypes.string),
  customHeadClassesForCells: PropTypes.arrayOf(PropTypes.number),
  striped: PropTypes.bool,
  // this will cause some changes in font
  tableShopping: PropTypes.bool
};`;

class Tables extends React.Component {
  render() {
    return (
      <div>
        <h1>Table</h1>
        <p>
          We've done this component to make it a bit more easier for you to
          populate and render a table.
        </p>
        <h2>Styles</h2>
        <p>
          You will find the styles for this component in
          <br />
          <code>
            src/assets/jss/material-kit-pro-react/components/tableStyle.jsx
          </code>
          .
        </p>
        <h2>Examples</h2>
        <h3>Simple With Actions</h3>
        <div className="border-example-8">
          <TableWithActions />
        </div>
        <SyntaxHighlighter language="jsx" style={prism}>
          {exampleTableWithActions}
        </SyntaxHighlighter>
        <h3>Striped With Checkboxes</h3>
        <div className="border-example-8">
          <TableWithCheckboxes />
        </div>
        <SyntaxHighlighter language="jsx" style={prism}>
          {exampleTableWithCheckboxes}
        </SyntaxHighlighter>
        <h3>Shopping Cart Table</h3>
        <div className="border-example-8">
          <ShoppingCart />
        </div>
        <SyntaxHighlighter language="jsx" style={prism}>
          {exampleShoppingCart}
        </SyntaxHighlighter>
        <h2>Props</h2>
        <SyntaxHighlighter language="jsx" style={prism}>
          {exampleProps}
        </SyntaxHighlighter>
      </div>
    );
  }
}

export default Tables;
