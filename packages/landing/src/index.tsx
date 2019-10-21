import React from "react";
import ReactDOM from "react-dom";
// import { createHashHistory } from "history";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { getCookie, setCookie } from '@dinify/common/src/lib/FN';

import LandingPage from "./views/LandingPage/LandingPage.jsx";
import RestaurantsPage from "./views/RestaurantsPage/RestaurantsPage.jsx";
import { localeMatcher, IntlProvider, IntlConfig } from "@dinify/common/src/lib/i18n";

import "assets/scss/material-kit-pro-react.css";

// var hist = createHashHistory();

//ReactPixel.init("111649226022273");
//ReactPixel.pageView();
//ReactPixel.fbq("track", "PageView");
//
//hist.listen(location => {
//  ReactPixel.pageView();
//  ReactPixel.fbq("track", "PageView");
//});

import getTheme from "@dinify/common/src/theme";

const lightTheme = getTheme({ type: "light" });

const intlConfig: IntlConfig = {
  namespace: 'landing'
};
const langCookie = getCookie('language');
if (langCookie) {
  try {
    intlConfig.locale = localeMatcher.match(langCookie).locale;
  } catch (e) {
    console.error('JSON parse error', e);
  }
}
else {
  setCookie('language', localeMatcher.match(navigator.language).locale.id, 30);
}

ReactDOM.render(
  <IntlProvider {...intlConfig}>
    <MuiThemeProvider theme={lightTheme}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={LandingPage} />
          <Route exact path="/restaurants" component={RestaurantsPage} />
          {/*
            <Route path="/about-us" component={AboutUsPage} />
            <Route path="/blog-post" component={BlogPostPage} />
            <Route path="/blog-posts" component={BlogPostsPage} />
            <Route path="/components" component={ComponentsPage} />
            <Route path="/contact-us" component={ContactUsPage} />
            <Route path="/ecommerce-page" component={EcommercePage} />
            <Route path="/presentation-page" component={PresentationPage} />
            <Route path="/login-page" component={LoginPage} />
            <Route path="/pricing" component={PricingPage} />
            <Route path="/profile-page" component={ProfilePage} />
            <Route path="/product-page" component={ProductPage} />
            <Route path="/sections" component={SectionsPage} />
            <Route path="/shopping-cart-page" component={ShoppingCartPage} />
            <Route path="/signup-page" component={SignupPage} />
            <Route path="/error-page" component={ErrorPage} />
            */}
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  </IntlProvider>,
  document.getElementById("root")
);
