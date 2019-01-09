// @flow
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { openDialog, closeDialog } from 'ducks/ui/actions';
import { matchPath } from 'react-router';
import { connect } from 'react-redux';
import { Motion, spring } from 'react-motion';
import { setCookie } from 'tabb-front/dist/lib/FN';
// import Auth from 'auth';

import Checkin from 'web/pages/Checkin';
import RestaurantView from 'web/pages/RestaurantView';
import CategoryView from 'web/pages/CategoryView';
import MenuItemView from 'web/pages/MenuItemView';
import SignIn from 'web/pages/SignIn';
import Eat from 'web/pages/Eat';
import Cart from 'web/pages/Cart';
import Bill from 'web/pages/Bill';
import Receipt from 'web/pages/Receipt';
import Services from 'web/pages/Services';
import Main from 'web/pages/Main';

import Button from '@material-ui/core/Button';
import Account from 'web/components/AppBar/Account';
import AppBar from 'web/components/AppBar';
import Navigation from 'web/components/Navigation';
import AccountExistsDialog from 'web/components/AccountExistsDialog';

import * as FN from 'tabb-front/dist/lib/FN';

import withRoot from 'withRoot.js';

class App extends React.Component {
  // auth = new Auth();

  //componentWillMount = () => {
  //  const { openDialog } = this.props;
  //  this.auth.subscribeState(user => {
  //    if (user) {
  //      this.auth.getIdTokenResult(result => {
  //        console.log('idToken', result.token);
  //        setCookie('access_token', result.token, 30);
  //        this.setState({ user: {
  //          claims: result.claims,
  //          id_token: result.token,
  //          ...user
  //        }});
  //      })
  //    }
  //    this.setState({ user });
  //  });
  //  this.auth.updateUser = user => {
  //    this.setState({ user });
  //  }
  //  this.auth.prompt = (type, pProps) => {
  //    switch (type) {
  //      case 'account-exists':
  //        openDialog({
  //          id: type,
  //          component: (props) => <AccountExistsDialog {...pProps} {...props}/>
  //        });
  //        break;
  //      default:
  //        break;
  //    }
  //  }
  //}

  onNavigate = (evt, val) => {
    if (val === 0) this.props.history.push('/');
    else if (val === 1) this.props.history.push('/eat');
    else if (val === 2) {
      if (this.props.checkedInRestaurant || process.env.REACT_APP_CAMERA_SCANNER_ENABLED === 'false') this.props.history.push('/services');
      else this.props.history.push('/checkin');
    }
  }

  match = (...paths) => {
    let matched = false;
    paths.forEach(path => {
      matched = matched || matchPath(this.props.location.pathname, { path }) != null;
    });
    return matched;
  }

  back = e => {
    e.stopPropagation();
    this.props.history.goBack();
  }

  render() {
    const {
      location,
      checkedInRestaurant,
      dialogs,
      closeDialog,
      history,
      user
    } = this.props;
    this.auth = {};
    this.auth.user = null;

    const HOMEPAGE = '/restaurant/koreagrill';
    const iosInstalled = FN.isInstalled() && FN.getPlatform() === 'ios';
    return (
      <div>
        <AppBar>
          {user.isEmpty ? <Button
            onClick={() => {history.push('/signin')}}
            variant="contained"
            color="primary">
            Sign in
          </Button> :
          <Account user={user} />}
        </AppBar>
        <div style={{marginBottom: 56}}>
          <Switch location={location}>
            <Route exact path="/" render={() => (
              HOMEPAGE !== '/' ? (
                <Redirect to="/restaurant/koreagrill"/>
              ) : (
                <Main/>
              )
            )}/>
            <Route exact path="/callback" render={() => {
              this.auth.handleAuthentication();
              return <Redirect to="/"/>;
            }}/>
            <Route path="/signin" component={() => {
              return user.isEmpty ? <SignIn auth={this.auth}/> :
              <Redirect to={HOMEPAGE}/>
            }} />

            <Route path="/checkin" component={Checkin} />
            <Route path="/restaurant/:subdomain" component={RestaurantView} />
            <Route path="/category/:id" component={CategoryView} />
            <Route path="/menu/item/:id" component={MenuItemView} />

            <Route path="/eat" component={Eat} />
            <Route path="/cart" component={Cart} />
            <Route path="/Bill" component={Bill} />
            <Route path="/receipt" component={Receipt} />
            <Route path="/services" component={Services} />
          </Switch>
        </div>
        <Motion
          defaultStyle={{x: 0}}
          style={{x: spring(this.match('/signin') ? 1 : 0)}}>
          {style =>
            <Navigation
              style={{
                transform: `translate3d(0, ${style.x * 56}px, 0)`
              }}
              handleChange={this.onNavigate}
              checkedInRestaurant={checkedInRestaurant}
              value={(() => {
                if (this.match('/eat')) return 1;
                if (this.match('/checkin') || this.match('/services')) return 2;
                return 0;
              })()}/>
          }
        </Motion>
        {FN.MapToList(dialogs).map(dialog => {
          return dialog.component({
            open: dialog.open,
            onClose: () => { closeDialog(dialog.id) }
          });
        })}
      </div>
    );
  }
}

App = connect(
  (state) => ({
    user: state.firebase.profile,
    loggedUserId: state.user.loggedUserId,
    checkedInRestaurant: state.restaurant.checkedInRestaurant,
    dialogs: state.ui.dialogs
  }),
  {
    openDialog,
    closeDialog,
  }
)(App);

const AppWrapper = () => (
  <div>
    <Router>
      <Route component={App} />
    </Router>
  </div>
);

export default withRoot(AppWrapper);
