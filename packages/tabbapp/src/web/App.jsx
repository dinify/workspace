// @flow
import React from 'react'

import { Router, Route } from 'react-router'

import Login from 'web/pages/Login'
import Checkin from 'web/pages/Checkin'

import RestaurantProfile from 'web/pages/RestaurantProfile'
import CategoryContent from 'web/pages/CategoryContent'
import FoodDetail from 'web/pages/FoodDetail'

import Cart from 'web/pages/Cart'
import Bill from 'web/pages/Bill'
import Receipt from 'web/pages/Receipt'

import Main from 'web/pages/Main'


const App = ({
  history,
}) => (
  <Router history={history}>
    <Route path="/login" component={Login} />
    <Route path="/checkin" component={Checkin} />

    <Route path="/restaurant/:subdomain" component={RestaurantProfile} />
    <Route path="/category/:id" component={CategoryContent} />
    <Route path="/food/:id" component={FoodDetail} />

    <Route path="/cart" component={Cart} />
    <Route path="/bill" component={Bill} />
    <Route path="/receipt" component={Receipt} />

    <Route path="/" component={Main} />
  </Router>
)

export default App
