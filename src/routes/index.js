import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Orders from '../pages/orders';
import NotFound from '../pages/NotFound';
import OrderDetails from '../pages/order-details';

const Routes = () => {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={Orders}/>
          <Route path="/orderdetails" component={OrderDetails} />
          <Route path="*" component={NotFound} />
        </Switch>
    </Router>
  );
}

export default Routes;