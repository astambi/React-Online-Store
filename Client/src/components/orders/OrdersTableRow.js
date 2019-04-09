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
    detailsLink: LinkToOrderDetails, // myOrder, adminOrder
    actionBtn: ActionBtn, // optional, admin only
    handleAction // optional, admin only
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
      <td>
        {LinkToOrderDetails ? <LinkToOrderDetails order={order} /> : null}
      </td>

      {/* Admin Actions: approve, deliver */}
      {ActionBtn && handleAction ? (
        <td>{<ActionBtn order={order} handleAction={handleAction} />}</td>
      ) : null}
    </tr>
  );
};

export default OrderRow;
