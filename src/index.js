/* eslint-disable prettier/prettier */
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "mobx-react";
import AuthLayout from "layouts/Auth.jsx";
import RtlLayout from "layouts/RTL.jsx";
import AdminLayout from "layouts/Admin.jsx";
import allStores from "./stores/AllStore";
import Coupon from "./views/Widgets/Coupon.jsx";
import "assets/scss/material-dashboard-pro-react.scss?v=1.7.0";
import EditCoupon from "./views/Widgets/EditCoupon.jsx"
import CouponHistory from "views/Widgets/CouponHistory.jsx";
import PointSetting from "views/Widgets/PointSetting.jsx";
import CreateCoupon from "views/Widgets/CreateCoupon.jsx";
import 'raf/polyfill';
const hist = createBrowserHistory();
ReactDOM.render(
  <Provider {...allStores}>
    <Router history={hist}>
      <Switch>
        <Route path="/edit" component={EditCoupon} />
        <Route path="/rtl" component={RtlLayout} />
        <Route path="/auth" component={AuthLayout} />
        <Route path="/admin" component={AdminLayout} />
        <Route path="/coupon" component={Coupon} />
        <Route path="/history" component={CouponHistory} />
        <Route path="/point" component={PointSetting} />
        <Route path="/create" component={CreateCoupon} />

        {/* <Redirect from="/" to="/admin/dashboard" /> */}
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);


