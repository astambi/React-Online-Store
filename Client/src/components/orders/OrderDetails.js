import React from "react";
import { Redirect } from "react-router-dom";
import OrderDetailsTableFooter from "./OrderDetailsTableFooter";
import ProductsTable from "../products/ProductsTable";
import ProductsTableBody from "../products/ProductsTableBody";
import ProductsTableHeader from "../products/ProductsTableHeader";
import notificationService from "../../services/notification-service";
import { calculateOrderTotal, toShortDate } from "../../services/helpers";
import { notificationMessages } from "../../constants/constants";

const OrderDetails = props => {
  const { order, notFound, redirectPath, children } = props;

  if (notFound) {
    // Error Notification
    notificationService.errorMsg(notificationMessages.orderNotFoundMsg);

    return <Redirect to={redirectPath} />;
  }

  if (!order) {
    return null;
  }

  const { date, status, products } = order;
  const orderTotal = calculateOrderTotal(products);

  return (
    <div className="container">
      <h1>
        {status} Order ({toShortDate(date)}) {children}
      </h1>

      <ProductsTable>
        <ProductsTableHeader />
        <ProductsTableBody products={products} />
        <OrderDetailsTableFooter orderTotal={orderTotal} />
      </ProductsTable>
    </div>
  );
};

export default OrderDetails;
