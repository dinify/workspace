/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";
import SyntaxHighlighter from "react-syntax-highlighter/prism";
import { prism } from "react-syntax-highlighter/styles/prism";
// @material-ui/core components
// @material-ui icons
// core components
import Accordion from "components/Accordion/Accordion.jsx";

// code examples
import ExampleLiveDemo from "./Modal/ExampleLiveDemo.jsx";
import ExampleScrolling from "./Modal/ExampleScrolling.jsx";
import ExampleLogin from "./Modal/ExampleLogin.jsx";
import ExampleSingup from "./Modal/ExampleSingup.jsx";
import ExampleTooltipsPopovers from "./Modal/ExampleTooltipsPopovers.jsx";
import ExampleOptionalSizes from "./Modal/ExampleOptionalSizes.jsx";

const codeExampleLiveDemo = `import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import Button from "components/CustomButtons/Button.jsx";

import modalStyle from "assets/jss/material-kit-pro-react/modalStyle.jsx";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class ExampleLiveDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liveDemo: false
    };
  }
  handleClickOpen(modal) {
    var x = [];
    x[modal] = true;
    this.setState(x);
  }
  handleClose(modal) {
    var x = [];
    x[modal] = false;
    this.setState(x);
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button
          color="primary"
          onClick={() => this.handleClickOpen("liveDemo")}
        >
          Launch Demo Modal
        </Button>
        <Dialog
          classes={{
            root: classes.modalRoot,
            paper: classes.modal
          }}
          open={this.state.liveDemo}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => this.handleClose("liveDemo")}
          aria-labelledby="classic-modal-slide-title"
          aria-describedby="classic-modal-slide-description"
        >
          <DialogTitle
            id="classic-modal-slide-title"
            disableTypography
            className={classes.modalHeader}
          >
            <Button
              simple
              className={classes.modalCloseButton}
              key="close"
              aria-label="Close"
              onClick={() => this.handleClose("liveDemo")}
            >
              {" "}
              <Close className={classes.modalClose} />
            </Button>
            <h4 className={classes.modalTitle}>Modal title</h4>
          </DialogTitle>
          <DialogContent
            id="classic-modal-slide-description"
            className={classes.modalBody}
          >
            <p>Woohoo, you're reading this text in a modal!</p>
          </DialogContent>
          <DialogActions className={classes.modalFooter}>
            <Button
              onClick={() => this.handleClose("liveDemo")}
              color="secondary"
            >
              Close
            </Button>
            <Button color="primary">Save changes</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(modalStyle)(ExampleLiveDemo);
`;
const codeExampleScrolling = `import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import Button from "components/CustomButtons/Button.jsx";

import modalStyle from "assets/jss/material-kit-pro-react/modalStyle.jsx";

const style = theme => ({
  ...modalStyle(theme),
  modalRootExample: {
    "& > div:first-child": {
      display: "none"
    },
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  }
});

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class ExampleScrolling extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollingModal: false
    };
  }
  handleClickOpen(modal) {
    var x = [];
    x[modal] = true;
    this.setState(x);
  }
  handleClose(modal) {
    var x = [];
    x[modal] = false;
    this.setState(x);
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button
          color="primary"
          onClick={() => this.handleClickOpen("scrollingModal")}
        >
          Launch Demo Modal
        </Button>
        <Dialog
          onClick={() => this.handleClose("scrollingModal")}
          classes={{
            root: \`\${classes.modalRoot} \${classes.modalRootExample}\`,
            paper: classes.modal
          }}
          open={this.state.scrollingModal}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => this.handleClose("scrollingModal")}
          aria-labelledby="classic-modal-slide-title"
          aria-describedby="classic-modal-slide-description"
        >
          <DialogTitle
            id="classic-modal-slide-title"
            disableTypography
            className={classes.modalHeader}
          >
            <Button
              simple
              className={classes.modalCloseButton}
              key="close"
              aria-label="Close"
              onClick={() => this.handleClose("scrollingModal")}
            >
              {" "}
              <Close className={classes.modalClose} />
            </Button>
            <h4 className={classes.modalTitle}>Modal title</h4>
          </DialogTitle>
          <DialogContent
            id="classic-modal-slide-description"
            className={classes.modalBody}
          >
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros.
            </p>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur
              et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
              auctor.
            </p>
            <p>
              Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
              cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
              dui. Donec ullamcorper nulla non metus auctor fringilla.
            </p>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros.
            </p>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur
              et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
              auctor.
            </p>
            <p>
              Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
              cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
              dui. Donec ullamcorper nulla non metus auctor fringilla.
            </p>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros.
            </p>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur
              et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
              auctor.
            </p>
            <p>
              Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
              cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
              dui. Donec ullamcorper nulla non metus auctor fringilla.
            </p>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros.
            </p>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur
              et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
              auctor.
            </p>
            <p>
              Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
              cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
              dui. Donec ullamcorper nulla non metus auctor fringilla.
            </p>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros.
            </p>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur
              et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
              auctor.
            </p>
            <p>
              Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
              cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
              dui. Donec ullamcorper nulla non metus auctor fringilla.
            </p>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros.
            </p>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur
              et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
              auctor.
            </p>
            <p>
              Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
              cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
              dui. Donec ullamcorper nulla non metus auctor fringilla.
            </p>
          </DialogContent>
          <DialogActions className={classes.modalFooter}>
            <Button
              onClick={() => this.handleClose("scrollingModal")}
              color="secondary"
            >
              Close
            </Button>
            <Button color="primary">Save changes</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(style)(ExampleScrolling);
`;
const codeExampleLogin = `import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
import Assignment from "@material-ui/icons/Assignment";
import Mail from "@material-ui/icons/Mail";
import Face from "@material-ui/icons/Face";
// core components
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import javascriptStyles from "assets/jss/material-kit-pro-react/views/componentsSections/javascriptStyles.jsx";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class ExampleLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginModal: false
    };
  }
  handleClickOpen(modal) {
    var x = [];
    x[modal] = true;
    this.setState(x);
  }
  handleClose(modal) {
    var x = [];
    x[modal] = false;
    this.setState(x);
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button round onClick={() => this.handleClickOpen("loginModal")}>
          Login <Assignment />
        </Button>
        <Dialog
          classes={{
            root: classes.modalRoot,
            paper: classes.modal + " " + classes.modalLogin
          }}
          open={this.state.loginModal}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => this.handleClose("loginModal")}
          aria-labelledby="login-modal-slide-title"
          aria-describedby="login-modal-slide-description"
        >
          <Card plain className={classes.modalLoginCard}>
            <DialogTitle
              id="login-modal-slide-title"
              disableTypography
              className={classes.modalHeader}
            >
              <CardHeader
                plain
                color="primary"
                className={\`\${classes.textCenter} \${classes.cardLoginHeader}\`}
              >
                <Button
                  simple
                  className={classes.modalCloseButton}
                  key="close"
                  aria-label="Close"
                  onClick={() => this.handleClose("loginModal")}
                >
                  {" "}
                  <Close className={classes.modalClose} />
                </Button>
                <h5 className={classes.cardTitleWhite}>Log in</h5>
                <div className={classes.socialLine}>
                  <Button justIcon link className={classes.socialLineButton}>
                    <i className="fab fa-facebook-square" />
                  </Button>
                  <Button justIcon link className={classes.socialLineButton}>
                    <i className="fab fa-twitter" />
                  </Button>
                  <Button justIcon link className={classes.socialLineButton}>
                    <i className="fab fa-google-plus-g" />
                  </Button>
                </div>
              </CardHeader>
            </DialogTitle>
            <DialogContent
              id="login-modal-slide-description"
              className={classes.modalBody}
            >
              <form>
                <p className={\`\${classes.description} \${classes.textCenter}\`}>
                  Or Be Classical
                </p>
                <CardBody className={classes.cardLoginBody}>
                  <CustomInput
                    id="login-modal-first"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Face className={classes.icon} />
                        </InputAdornment>
                      ),
                      placeholder: "First Name..."
                    }}
                  />
                  <CustomInput
                    id="login-modal-email"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Mail className={classes.icon} />
                        </InputAdornment>
                      ),
                      placeholder: "Email..."
                    }}
                  />
                  <CustomInput
                    id="login-modal-pass"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon className={classes.icon}>lock_outline</Icon>
                        </InputAdornment>
                      ),
                      placeholder: "Password..."
                    }}
                  />
                </CardBody>
              </form>
            </DialogContent>
            <DialogActions
              className={\`\${classes.modalFooter} \${
                classes.justifyContentCenter
              }\`}
            >
              <Button color="primary" simple size="lg">
                Get started
              </Button>
            </DialogActions>
          </Card>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(javascriptStyles)(ExampleLogin);
`;
const codeExampleSingup = `import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
import Assignment from "@material-ui/icons/Assignment";
import Face from "@material-ui/icons/Face";
import Timeline from "@material-ui/icons/Timeline";
import Code from "@material-ui/icons/Code";
import Group from "@material-ui/icons/Group";
import Email from "@material-ui/icons/Email";
import Check from "@material-ui/icons/Check";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";

import javascriptStyles from "assets/jss/material-kit-pro-react/views/componentsSections/javascriptStyles.jsx";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class ExampleSingup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signupModal: false
    };
  }
  handleClickOpen(modal) {
    var x = [];
    x[modal] = true;
    this.setState(x);
  }
  handleClose(modal) {
    var x = [];
    x[modal] = false;
    this.setState(x);
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button round onClick={() => this.handleClickOpen("signupModal")}>
          <Assignment /> Signup
        </Button>
        <Dialog
          classes={{
            root: classes.modalRoot,
            paper: classes.modal + " " + classes.modalSignup
          }}
          open={this.state.signupModal}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => this.handleClose("signupModal")}
          aria-labelledby="signup-modal-slide-title"
          aria-describedby="signup-modal-slide-description"
        >
          <Card plain className={classes.modalSignupCard}>
            <DialogTitle
              id="signup-modal-slide-title"
              disableTypography
              className={classes.modalHeader}
            >
              <Button
                simple
                className={classes.modalCloseButton}
                key="close"
                aria-label="Close"
                onClick={() => this.handleClose("signupModal")}
              >
                {" "}
                <Close className={classes.modalClose} />
              </Button>
              <h5 className={\`\${classes.cardTitle} \${classes.modalTitle}\`}>
                Register
              </h5>
            </DialogTitle>
            <DialogContent
              id="signup-modal-slide-description"
              className={classes.modalBody}
            >
              <GridContainer>
                <GridItem xs={12} sm={5} md={5} className={classes.mlAuto}>
                  <InfoArea
                    className={classes.infoArea}
                    title="Marketing"
                    description={
                      <p>
                        We've created the marketing campaign of the website. It
                        was a very interesting collaboration.
                      </p>
                    }
                    icon={Timeline}
                    iconColor="rose"
                  />
                  <InfoArea
                    className={classes.infoArea}
                    title="Fully Coded in HTML5"
                    description={
                      <p>
                        We've developed the website with HTML5 and CSS3. The
                        client has access to the code using GitHub.
                      </p>
                    }
                    icon={Code}
                    iconColor="primary"
                  />
                  <InfoArea
                    className={classes.infoArea}
                    title="Built Audience"
                    description={
                      <p>
                        There is also a Fully Customizable CMS Admin Dashboard
                        for this product.
                      </p>
                    }
                    icon={Group}
                    iconColor="info"
                  />
                </GridItem>
                <GridItem xs={12} sm={5} md={5} className={classes.mrAuto}>
                  <div className={classes.textCenter}>
                    <Button justIcon round color="twitter">
                      <i className="fab fa-twitter" />
                    </Button>
                    {\` \`}
                    <Button justIcon round color="dribbble">
                      <i className="fab fa-dribbble" />
                    </Button>
                    {\` \`}
                    <Button justIcon round color="facebook">
                      <i className="fab fa-facebook-f" />
                    </Button>
                    {\` \`}
                    <h4 className={classes.socialTitle}>or be classical</h4>
                  </div>
                  <form className={classes.form}>
                    <CustomInput
                      formControlProps={{
                        fullWidth: true,
                        className: classes.customFormControlClasses
                      }}
                      inputProps={{
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            className={classes.inputAdornment}
                          >
                            <Face className={classes.inputAdornmentIcon} />
                          </InputAdornment>
                        ),
                        placeholder: "First Name..."
                      }}
                    />
                    <CustomInput
                      formControlProps={{
                        fullWidth: true,
                        className: classes.customFormControlClasses
                      }}
                      inputProps={{
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            className={classes.inputAdornment}
                          >
                            <Email className={classes.inputAdornmentIcon} />
                          </InputAdornment>
                        ),
                        placeholder: "Email..."
                      }}
                    />
                    <CustomInput
                      formControlProps={{
                        fullWidth: true,
                        className: classes.customFormControlClasses
                      }}
                      inputProps={{
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            className={classes.inputAdornment}
                          >
                            <Icon className={classes.inputAdornmentIcon}>lock_outline</Icon>
                          </InputAdornment>
                        ),
                        placeholder: "Password..."
                      }}
                    />
                    <FormControlLabel
                      classes={{
                        label: classes.label
                      }}
                      control={
                        <Checkbox
                          tabIndex={-1}
                          onClick={() => this.handleToggle(1)}
                          checkedIcon={
                            <Check className={classes.checkedIcon} />
                          }
                          icon={<Check className={classes.uncheckedIcon} />}
                          classes={{
                            checked: classes.checked,
                            root: classes.checkRoot
                          }}
                        />
                      }
                      label={
                        <span>
                          I agree to the{" "}
                          <a href="#pablo">terms and conditions</a>.
                        </span>
                      }
                    />
                    <div className={classes.textCenter}>
                      <Button round color="primary">
                        Get started
                      </Button>
                    </div>
                  </form>
                </GridItem>
              </GridContainer>
            </DialogContent>
          </Card>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(javascriptStyles)(ExampleSingup);
`;
const codeExampleTooltipsPopovers = `import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Tooltip from "@material-ui/core/Tooltip";
import Popover from "@material-ui/core/Popover";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import Button from "components/CustomButtons/Button.jsx";

import modalStyle from "assets/jss/material-kit-pro-react/modalStyle.jsx";
import popoverStyles from "assets/jss/material-kit-pro-react/popoverStyles.jsx";
import tooltipsStyle from "assets/jss/material-kit-pro-react/tooltipsStyle.jsx";

const style = theme => ({
  ...modalStyle(theme),
  ...popoverStyles,
  ...tooltipsStyle
});

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class ExampleTooltipsPopovers extends React.Component {
  anchorElLeft = null;
  constructor(props) {
    super(props);
    this.state = {
      openLeft: false,
      liveDemo: false
    };
  }
  handleClosePopover(state) {
    this.setState({
      [state]: false
    });
  }
  handleClickButton(state) {
    this.setState({
      [state]: true
    });
  }
  handleClickOpen(modal) {
    var x = [];
    x[modal] = true;
    this.setState(x);
  }
  handleClose(modal) {
    var x = [];
    x[modal] = false;
    this.setState(x);
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button
          color="primary"
          onClick={() => this.handleClickOpen("liveDemo")}
        >
          Launch Demo Modal
        </Button>
        <Dialog
          classes={{
            root: classes.modalRoot,
            paper: classes.modal
          }}
          open={this.state.liveDemo}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => this.handleClose("liveDemo")}
          aria-labelledby="classic-modal-slide-title"
          aria-describedby="classic-modal-slide-description"
        >
          <DialogTitle
            id="classic-modal-slide-title"
            disableTypography
            className={classes.modalHeader}
          >
            <Button
              simple
              className={classes.modalCloseButton}
              key="close"
              aria-label="Close"
              onClick={() => this.handleClose("liveDemo")}
            >
              {" "}
              <Close className={classes.modalClose} />
            </Button>
            <h4 className={classes.modalTitle}>Modal title</h4>
          </DialogTitle>
          <DialogContent
            id="classic-modal-slide-description"
            className={classes.modalBody}
          >
            <h4>Popover in a modal</h4>
            <p>
              This
              <Button
                color="secondary"
                buttonRef={node => {
                  this.anchorElLeft = node;
                }}
                onClick={() => this.handleClickButton("openLeft")}
              >
                Button
              </Button>
              <Popover
                classes={{
                  paper: classes.popover
                }}
                open={this.state.openLeft}
                anchorEl={this.anchorElLeft}
                anchorReference={"anchorEl"}
                onClose={() => this.handleClosePopover("openLeft")}
                anchorOrigin={{
                  vertical: "center",
                  horizontal: "left"
                }}
                transformOrigin={{
                  vertical: "center",
                  horizontal: "right"
                }}
              >
                <h3 className={classes.popoverHeader}>Popover on left</h3>
                <div className={classes.popoverBody}>
                  Here will be some very useful information about his popover.
                  Here will be some very useful information about his popover.
                </div>
              </Popover>
              triggers a popover on click.
            </p>
            <hr />
            <h4>Tooltips in a modal</h4>
            <p>
              <Tooltip
                id="ex-to-po-1"
                title="Default tooltip"
                placement="top"
                classes={{ tooltip: classes.tooltip }}
              >
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  {" "}
                  This link{" "}
                </a>
              </Tooltip>{" "}
              and
              <Tooltip
                id="ex-to-po-2"
                title="Default tooltip"
                placement="top"
                classes={{ tooltip: classes.tooltip }}
              >
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  {" "}
                  that link{" "}
                </a>
              </Tooltip>
              have tooltips on hover.
            </p>
          </DialogContent>
          <DialogActions className={classes.modalFooter}>
            <Button
              onClick={() => this.handleClose("liveDemo")}
              color="secondary"
            >
              Close
            </Button>
            <Button color="primary">Save changes</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(style)(ExampleTooltipsPopovers);
`;
const codeExampleOptionalSizes = `import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import Button from "components/CustomButtons/Button.jsx";

import javascriptStyles from "assets/jss/material-kit-pro-react/views/componentsSections/javascriptStyles.jsx";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class ExampleOptionalSizes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      smallModal: false,
      largeModal: false
    };
  }
  handleClickOpen(modal) {
    var x = [];
    x[modal] = true;
    this.setState(x);
  }
  handleClose(modal) {
    var x = [];
    x[modal] = false;
    this.setState(x);
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button
          color="primary"
          onClick={() => this.handleClickOpen("largeModal")}
        >
          Large Modal
        </Button>
        <Dialog
          classes={{
            root: classes.modalRoot,
            paper: classes.modal + " " + classes.modalLarge
          }}
          open={this.state.largeModal}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => this.handleClose("largeModal")}
          aria-labelledby="large-modal-slide-title"
          aria-describedby="large-modal-slide-description"
        >
          <DialogTitle
            id="large-modal-slide-title"
            disableTypography
            className={classes.modalHeader}
          >
            <Button
              simple
              className={classes.modalCloseButton}
              key="close"
              aria-label="Close"
              onClick={() => this.handleClose("largeModal")}
            >
              {" "}
              <Close className={classes.modalClose} />
            </Button>
            <h4 className={classes.modalTitle}>Large modal</h4>
          </DialogTitle>
          <DialogContent
            id="large-modal-slide-description"
            className={classes.modalBody}
          >
            <p>...</p>
          </DialogContent>
        </Dialog>

        <Button
          color="primary"
          onClick={() => this.handleClickOpen("smallModal")}
        >
          Small Modal
        </Button>
        <Dialog
          classes={{
            root: classes.modalRoot,
            paper: classes.modal + " " + classes.modalSmall
          }}
          open={this.state.smallModal}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => this.handleClose("smallModal")}
          aria-labelledby="small-modal-slide-title"
          aria-describedby="small-modal-slide-description"
        >
          <DialogTitle
            id="small-modal-slide-title"
            disableTypography
            className={classes.modalHeader}
          >
            <Button
              simple
              className={classes.modalCloseButton}
              key="close"
              aria-label="Close"
              onClick={() => this.handleClose("smallModal")}
            >
              {" "}
              <Close className={classes.modalClose} />
            </Button>
            <h4 className={classes.modalTitle}>Small modal</h4>
          </DialogTitle>
          <DialogContent
            id="small-modal-slide-description"
            className={classes.modalBody + " " + classes.modalSmallBody}
          >
            <p>...</p>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(javascriptStyles)(ExampleOptionalSizes);
`;

function Modal() {
  return (
    <div>
      <h1>Modal</h1>
      <p>
        Use material-ui's dialog component to add dialogs to your site for
        lightboxes, user notifications, or completely custom content.
      </p>
      <h2>Styles</h2>
      <p>
        You will find the styles for this component in
        <br />
        <code>src/assets/jss/material-kit-pro-react/modalStyle.jsx.</code>
      </p>
      <h2>Examples</h2>
      <h3>Live demo</h3>
      <p>
        Toggle a working modal demo by clicking the button below. It will slide
        down and fade in from the top of the page.
      </p>
      <div className="border-example-8">
        <ExampleLiveDemo />
        <br />
        <Accordion
          collapses={[
            {
              title: "View Example Code",
              content: (
                <SyntaxHighlighter language="jsx" style={prism}>
                  {codeExampleLiveDemo}
                </SyntaxHighlighter>
              )
            }
          ]}
        />
      </div>
      <h3>Scrolling long content</h3>
      <p>
        When modals become too long for the user’s viewport or device, they
        scroll independent of the page itself. Try the demo below to see what we
        mean.
      </p>
      <div className="border-example-8">
        <ExampleScrolling />
        <br />
        <Accordion
          collapses={[
            {
              title: "View Example Code",
              content: (
                <SyntaxHighlighter language="jsx" style={prism}>
                  {codeExampleScrolling}
                </SyntaxHighlighter>
              )
            }
          ]}
        />
      </div>
      <h3>Login modal</h3>
      <div className="border-example-8">
        <ExampleLogin />
        <br />
        <Accordion
          collapses={[
            {
              title: "View Example Code",
              content: (
                <SyntaxHighlighter language="jsx" style={prism}>
                  {codeExampleLogin}
                </SyntaxHighlighter>
              )
            }
          ]}
        />
      </div>
      <h3>Signup modal</h3>
      <div className="border-example-8">
        <ExampleSingup />
        <br />
        <Accordion
          collapses={[
            {
              title: "View Example Code",
              content: (
                <SyntaxHighlighter language="jsx" style={prism}>
                  {codeExampleSingup}
                </SyntaxHighlighter>
              )
            }
          ]}
        />
      </div>
      <h3>Tooltips and popovers</h3>
      <p>
        <Link to="/documentation/tooltips">Tooltips</Link> and{" "}
        <Link to="/documentation/popovers">popovers</Link> can be placed within
        modals as needed. When modals are closed, any tooltips and popovers
        within are also automatically dismissed.
      </p>
      <div className="border-example-8">
        <ExampleTooltipsPopovers />
        <br />
        <Accordion
          collapses={[
            {
              title: "View Example Code",
              content: (
                <SyntaxHighlighter language="jsx" style={prism}>
                  {codeExampleTooltipsPopovers}
                </SyntaxHighlighter>
              )
            }
          ]}
        />
      </div>
      <h3>Optional sizes</h3>
      <p>
        Modals have two optional sizes, available via modifier classes. These
        sizes kick in at certain breakpoints to avoid horizontal scrollbars on
        narrower viewports.
      </p>
      <div className="border-example-8">
        <ExampleOptionalSizes />
        <br />
        <Accordion
          collapses={[
            {
              title: "View Example Code",
              content: (
                <SyntaxHighlighter language="jsx" style={prism}>
                  {codeExampleOptionalSizes}
                </SyntaxHighlighter>
              )
            }
          ]}
        />
      </div>
      <h2>Props</h2>
      <p>
        For props please refer to{" "}
        <a href="https://material-ui.com/demos/dialogs/" target="_blank">
          material-ui's official documentation
        </a>
        .
      </p>
    </div>
  );
}

export default Modal;
