import React from "react";
import { Route, Switch } from "react-router-dom";
// Routes
import AdminRoute from "./components/routes/AdminRoute";
import LoggedInRoute from "./components/routes/LoggedInRoute";
// Components
import BookAdminCreateEdit from "./components/books/BookAdminCreateEdit";
import BookAdminDelete from "./components/books/BookAdminDelete";
import BookDetails from "./components/books/BookDetails";
import Cart from "./components/cart/Cart";
import Home from "./components/home/Home";
import Login from "./components/authentication/Login";
import Logout from "./components/authentication/Logout";
import MyOrders from "./components/orders/MyOrders";
import MyOrderDetails from "./components/orders/MyOrderDetails";
import NotFound from "./components/common/NotFound";
import PendingOrders from "./components/orders/PendingOrders";
import PendingOrderDetails from "./components/orders/PendingOrderDetails";
import Register from "./components/authentication/Register";
import Store from "./components/store/Store";
import { paths } from "./constants/constants";

const AppRouter = () => (
  <Switch>
    {/* All */}
    <Route path={paths.indexPath} exact component={Home} />
    <Route path={paths.homePath} component={Home} />
    <Route path={paths.storePath} component={Store} />
    <Route path={paths.loginPath} component={Login} />
    <Route path={paths.registerPath} component={Register} />
    <Route path={paths.logoutPath} component={Logout} />
    <Route path={`${paths.bookDetailsPath}/:id`} component={BookDetails} />

    {/* Admin */}
    <AdminRoute path={paths.bookCreatePath} component={BookAdminCreateEdit} />
    <AdminRoute
      path={`${paths.bookEditPath}/:id`}
      component={BookAdminCreateEdit}
    />
    <AdminRoute
      path={`${paths.bookDeletePath}/:id`}
      component={BookAdminDelete}
    />
    <AdminRoute
      path={paths.ordersPendingPath}
      exact
      component={PendingOrders}
    />
    <AdminRoute
      path={`${paths.ordersPendingDetailsPath}/:id`}
      component={PendingOrderDetails}
    />

    {/* LoggedIn */}
    <LoggedInRoute path={paths.cartPath} component={Cart} />
    <LoggedInRoute path={paths.profilePath} component={NotFound} />
    <LoggedInRoute path={paths.ordersPath} exact component={MyOrders} />
    <LoggedInRoute
      path={`${paths.orderDetailsPath}/:id`}
      component={MyOrderDetails}
    />

    {/* Not Found */}
    <Route component={NotFound} />
  </Switch>
);

export default AppRouter;
