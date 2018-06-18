import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import withRoot from 'withRoot.js';
import withWidth, { isWidthUp, isWidthDown } from '@material-ui/core/withWidth';
import ViewModeSelector from 'web/components/ViewModeSelector';
import RestaurantListItem from 'web/components/RestaurantListItem';
import Map from 'web/components/Map';
import ChevronRight from 'icons/ChevronRight';
import AppBar from 'web/components/AppBar';
import ResponsiveContainer from 'web/components/ResponsiveContainer';
import ResponsiveGrid from 'web/components/ResponsiveGrid';

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
});

class Index extends React.Component {
  state = {
    dark: false,
    viewMode: 0,
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
      if (this.state.viewMode === 2) {
        this.setState({
          viewMode: 0
        })
      }
    }
  }

  handleViewModeChange = (value) => {
   this.setState({ viewMode: value });
  };

  render() {
    const { classes } = this.props;
    const { viewMode, extraSmallScreen } = this.state;

    let largeScreen = isWidthUp('lg', this.props.width);
    let smallScreen = isWidthDown('xs', this.props.width);

    return (
      <div className={classes.root}>
        <AppBar>
          {!smallScreen && (
            <ViewModeSelector
              selected={this.state.viewMode}
              splitAvailable={largeScreen}
              onViewModeChange={this.handleViewModeChange}/>
          )}
        </AppBar>

        {viewMode !== 0 && (
          <div style={{position: 'fixed', right: '0', bottom: '0'}}>
            <Map
              width={viewMode === 1 ? this.state.window.width : 440}
              height={this.state.window.height - (smallScreen ? 56 : 64)}/>
          </div>
        )}

        {viewMode !== 1 && (
          <div style={{ marginRight: viewMode === 2 ? 440 : 0 }}>
            <ResponsiveContainer narrow={viewMode === 2}>
              <Typography style={{paddingTop: '32px'}} variant="headline" gutterBottom>
                Explore local places
              </Typography>

              <ResponsiveGrid lg={viewMode === 2 ? 4 : 3}>
                <RestaurantListItem
                  name="Korea Grill Restaurant"
                  tags={["Korean", "International"]}
                  images={[
                    "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=720&h=480&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=543f159fd86d08f2a29d838002801508",
                    "https://images.unsplash.com/photo-1484980972926-edee96e0960d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=720&h=480&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=a7bf37fcba247f66eda688de9e08b1a6",
                    "https://images.unsplash.com/photo-1458644267420-66bc8a5f21e4?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=720&h=480&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=407ebb58ce075c27c754535537e24d69"]}
                  shortDescription="Warm and cozy place for those who seek a bite of the asian peninsula"/>
                <RestaurantListItem
                  name="Augustine"
                  tags={["Classic French"]}
                  images={["https://images.unsplash.com/photo-1484659619207-9165d119dafe?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=720&h=480&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=4ef799257af2fad558ff5e522337298b"]}
                  shortDescription="Hearty dishes in a warm, comfortable bistro"/>
                <RestaurantListItem
                  name="The Wooly Public"
                  tags={["Fine American"]}
                  images={["https://images.unsplash.com/photo-1498956483307-8b7e3ba3027f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=720&h=480&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=20673d55992eee595251127a318a9c49"]}
                  shortDescription="Pub fare at an eclectic spot with new and classic cocktails"/>
                <RestaurantListItem
                  name="Little Choc Apothecary"
                  tags={["Vegan Creperie"]}
                  images={["https://images.unsplash.com/photo-1515948578606-e129bb3f01f4?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=720&h=480&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=7f120bc9e12155a44b14c710e0c0511f"]}
                  shortDescription="Sweet and savory crepes in a space like a country cafe"/>
              </ResponsiveGrid>

              <Typography style={{marginBottom: '8px', marginTop: 32}} variant="caption">
                455 more
              </Typography>
              <Button variant="outlined" color="secondary">
                Show all
                <ChevronRight style={{marginLeft: 8}}/>
              </Button>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(
  withStyles(styles)(withWidth()(Index))
);
