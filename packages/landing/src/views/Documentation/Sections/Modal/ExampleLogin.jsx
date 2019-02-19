import React from "react";
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
                className={`${classes.textCenter} ${classes.cardLoginHeader}`}
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
                <p className={`${classes.description} ${classes.textCenter}`}>
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
              className={`${classes.modalFooter} ${
                classes.justifyContentCenter
              }`}
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
