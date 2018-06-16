import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ModalManager from '@material-ui/core/Modal';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';
import withWidth, { isWidthUp, isWidthDown } from '@material-ui/core/withWidth';
import ViewModeSelector from '../components/ViewModeSelector';
import RestaurantListItem from '../components/RestaurantListItem';
import OnboardingDialog from '../components/OnboardingDialog';
import Map from '../components/Map';
import PageIndicator from '../components/PageIndicator';
import ChevronRight from '../icons/ChevronRight';
import classNames from 'classnames';
import SVG from 'react-inlinesvg';

const styles = theme => ({
  root: {

  },
  padded: {
    paddingTop: '64px',
    paddingLeft: theme.spacing.unit * 15,
    paddingRight: theme.spacing.unit * 15,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing.unit * 8,
      paddingRight: theme.spacing.unit * 8
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: '56px',
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2
    }
  },
  paddedMap: {
    paddingTop: theme.spacing.unit * 9,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: '464px',
    [theme.breakpoints.down('md')]: {
      paddingRight: theme.spacing.unit * 3
    },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2
    }
  },
  appBar: {
    boxShadow: 'none',
    backgroundColor: theme.palette.background.default
  },
  flex: {
    flex: 1
  },
  logo: {
    width: '24px',
    maxWidth: '24px',
    opacity: '0.87',
    display: 'inline-block'
  },
  logoText: {
    width: '74px',
    maxWidth: '74px',
    opacity: '0.87',
    display: 'inline-block'
  }
});

class Index extends React.Component {
  state = {
    open: false,
    dark: false,
    viewMode: 0,
    extraSmallScreen: false,
    onboardingDialog: {
      open: false,
      isSignup: false
    },
    window: {
      width: 0,
      height: 0
    }
  };

  componentDidMount() {
    if (isWidthUp('lg', this.props.width)) {
      this.setState({
        viewMode: 0 // 2
      })
    }
    window.addEventListener('resize', this._resize);
    this._resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize);
  }

  _resize = () => {
    if (window.innerWidth <= 400) {
      this.setState({extraSmallScreen: true});
    }
    else if (this.state.extraSmallScreen) this.setState({extraSmallScreen: false});

    this.setState({
      window: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.width !== prevProps.width) {
      // the component has been resized
      if (this.state.viewMode == 2) {
        this.setState({
          viewMode: 0
        })
      }
    }
  }

  handleOnboardingClose = () => {
    let onboardingDialog = this.state.onboardingDialog;
    onboardingDialog.open = false;
    this.setState({onboardingDialog});
  };

  handleSignupClick = () => {
    this.setState({
      onboardingDialog: {
        open: true,
        isSignup: true
      }
    });
  };

  handleLoginClick = () => {
    this.setState({
      onboardingDialog: {
        open: true,
        isSignup: false
      }
    });
  };

  handleViewModeChange = (value) => {
   this.setState({ viewMode: value });
  };

  render() {
    const { classes } = this.props;
    const { open, viewMode, extraSmallScreen } = this.state;

    let largeScreen = isWidthUp('lg', this.props.width);
    let smallScreen = isWidthDown('xs', this.props.width);
    let logoWithText = isWidthUp('md', this.props.width);

    let logo = (
      <a href="#" className={logoWithText ? classes.logoText : classes.logo}>
        <SVG
          className={logoWithText ? classes.logoText : classes.logo}
          src={"http://images.tabb.global/brand/" + (this.state.dark ?
            (logoWithText ? "logo-text.svg" : "logo.svg") :
            (logoWithText ? "logo-text-dark.svg" : "logo-dark.svg"))}>
          <img src={"http://images.tabb.global/brand/" + (this.state.dark ?
            (logoWithText ? "logo-text.png" : "logo.png") :
            (logoWithText ? "logo-text-dark.png" : "logo-dark.png"))}/>
        </SVG>
      </a>
    );

    let map = viewMode == 0 ? null : (
      <div style={{position: 'fixed', right: '0', bottom: '0'}}>
        <Map
          width={viewMode == 1 ? this.state.window.width : 440}
          height={this.state.window.height - (smallScreen ? 56 : 64)}/>
      </div>
    );

    let grid = (
      <Grid container spacing={smallScreen ? 16 : 24}>
          <Grid item xs={extraSmallScreen ? 12 : 6} sm={6} lg={viewMode == 0 ? 3 : 4}>
            <RestaurantListItem
              name="Korea Grill Restaurant"
              tags={["Korean", "International"]}
              images={[
                "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=720&h=480&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=543f159fd86d08f2a29d838002801508",
                "https://images.unsplash.com/photo-1484980972926-edee96e0960d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=720&h=480&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=a7bf37fcba247f66eda688de9e08b1a6",
                "https://images.unsplash.com/photo-1458644267420-66bc8a5f21e4?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=720&h=480&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=407ebb58ce075c27c754535537e24d69"]}
              shortDescription="Warm and cozy place for those who seek a bite of the asian peninsula"/>
          </Grid>
          <Grid item xs={extraSmallScreen ? 12 : 6} sm={6} lg={viewMode == 0 ? 3 : 4}>
            <RestaurantListItem
              name="Augustine"
              tags={["Classic French"]}
              images={["https://images.unsplash.com/photo-1484659619207-9165d119dafe?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=720&h=480&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=4ef799257af2fad558ff5e522337298b"]}
              shortDescription="Hearty dishes in a warm, comfortable bistro"/>
          </Grid>
          <Grid item xs={extraSmallScreen ? 12 : 6} sm={6} lg={viewMode == 0 ? 3 : 4}>
            <RestaurantListItem
              name="The Wooly Public"
              tags={["Fine American"]}
              images={["https://images.unsplash.com/photo-1498956483307-8b7e3ba3027f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=720&h=480&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=20673d55992eee595251127a318a9c49"]}
              shortDescription="Pub fare at an eclectic spot with new and classic cocktails"/>
          </Grid>
          <Grid item xs={extraSmallScreen ? 12 : 6} sm={6} lg={viewMode == 0 ? 3 : 4}>
            <RestaurantListItem
              name="Little Choc Apothecary"
              tags={["Vegan Creperie"]}
              images={["https://images.unsplash.com/photo-1515948578606-e129bb3f01f4?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=720&h=480&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=7f120bc9e12155a44b14c710e0c0511f"]}
              shortDescription="Sweet and savory crepes in a space like a country cafe"/>
          </Grid>
        </Grid>
    );

    let restaurantListView = viewMode == 1 ? null : (
      <div className={viewMode == 2 ? classes.paddedMap : classes.padded}>
        <Typography style={{paddingTop: '32px'}} variant="headline" gutterBottom>
          Explore local places
        </Typography>

        {grid}

        <Typography style={{marginBottom: '8px', marginTop: 32}} variant="caption">
          455 more
        </Typography>
        <Button variant="outlined" color="secondary">
          Show all
          <ChevronRight style={{marginLeft: 8}}/>
        </Button>
      </div>
    );

    let viewModelSelector = smallScreen ? null : (
      <ViewModeSelector
        selected={this.state.viewMode}
        splitAvailable={largeScreen}
        onViewModeChange={this.handleViewModeChange}/>
    );

    return (
      <div className={classes.root}>
        <AppBar position="fixed" color="default" className={classes.appBar}>
          <Toolbar>
            {logo}
            <div className={classes.flex}></div>
            {viewModelSelector}
            <Button onClick={this.handleLoginClick} variant="outlined" color="primary" style={{marginRight: '24px', marginLeft: '24px'}}>Log in</Button>
            <Button onClick={this.handleSignupClick} variant="contained" color="primary">Sign up</Button>
          </Toolbar>
          <Divider/>
        </AppBar>
        {map}
        {restaurantListView}
        <OnboardingDialog isSignup={this.state.onboardingDialog.isSignup} open={this.state.onboardingDialog.open} onClose={this.handleOnboardingClose}/>
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(withWidth()(Index)));
