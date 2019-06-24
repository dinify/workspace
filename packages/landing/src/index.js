import React from "react";
import ReactDOM from "react-dom";
// import { createHashHistory } from "history";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import i18n from '@dinify/common/dist/i18n';
import { getCookie, setCookie } from '@dinify/common/dist/lib/FN';

import LandingPage from "views/LandingPage/LandingPage.jsx";

// var hist = createHashHistory();

//ReactPixel.init("111649226022273");
//ReactPixel.pageView();
//ReactPixel.fbq("track", "PageView");
//
//hist.listen(location => {
//  ReactPixel.pageView();
//  ReactPixel.fbq("track", "PageView");
//});


import getTheme from "@dinify/common/dist/theme";

const lightTheme = getTheme({ type: "light" });

let language = navigator.language;
const langCookie = getCookie('language');
if (langCookie) {
  language = langCookie;
} else {
  setCookie('language', language, 30);
}

window.i18nInstance = i18n({
  namespace: 'landing',
  lang: language,
});

ReactDOM.render(
  <MuiThemeProvider theme={lightTheme}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
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
  </MuiThemeProvider>,
  document.getElementById("root")
);
