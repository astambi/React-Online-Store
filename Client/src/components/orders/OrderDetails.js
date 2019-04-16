import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import OrderDetailsTableFooter from "./OrderDetailsTableFooter";
import ProductsTable from "../products/ProductsTable";
import ProductsTableBody from "../products/ProductsTableBody";
import ProductsTableHeader from "../products/ProductsTableHeader";
import withLoading from "../hocs/withLoading";
import bookService from "../../services/book-service";
import notificationService from "../../services/notification-service";
import { calculateOrderTotal, toShortDate } from "../../services/helpers";
import { notificationMessages } from "../../constants/constants";

class OrderDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      availableProducts: []
    };
  }

  componentDidMount = async () => {
    const { order } = this.props;
    if (!order) {
      return;
    }

    const { products } = order;
    if (!products || products.length === 0) {
      return;
    }

    this.setState({ isLoading: true });
    const availableProducts = await bookService.filterAvailableBooks(products);
    this.setState({ availableProducts, isLoading: false });
  };

  render() {
    const { notFound, order, redirectPath, children } = this.props;

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

    const { isLoading, availableProducts } = this.state;

    return (
      <div className="container">
        <h1>
          {status} Order ({toShortDate(date)}) {children}
        </h1>

        <ProductsTable isLoading={isLoading}>
          <ProductsTableHeader />
          <ProductsTableBody
            products={products}
            availableProducts={availableProducts}
          />
          <OrderDetailsTableFooter orderTotal={orderTotal} />
        </ProductsTable>
      </div>
    );
  }
}

// export default OrderDetails;
export default withLoading(OrderDetails);
