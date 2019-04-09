import React from "react";
import {
  calculateOrderTotal,
  getProductsTitles,
  toCurrency,
  toShortDate
} from "../../services/helpers";

const OrderRow = props => {
  const {
    order,
    index,
    detailsLink: OrderDetailsLink, // myOrder, pendingOrder
    approveLink: OrderApproveBtn, // optional, admin only
    handleApprove // optional, admin only
  } = props;

  if (!order) {
    return null;
  }

  const { date, status, products } = order;
  const orderTotal = calculateOrderTotal(products);
  const productTitles = getProductsTitles(products);

  return (
    <tr>
      <th>
        #{index} {productTitles}
      </th>
      <td>{toShortDate(date)}</td>
      <td className="text-right">{toCurrency(orderTotal)}</td>
      <td>
        <span className="label label-info">{status}</span>
      </td>

      {/* Order Details Link */}
      <td>{OrderDetailsLink ? <OrderDetailsLink order={order} /> : null}</td>

      {/* Admin Approve Order */}
      {OrderApproveBtn ? (
        <td>
          {<OrderApproveBtn order={order} handleApprove={handleApprove} />}
        </td>
      ) : null}
    </tr>
  );
};

export default OrderRow;
