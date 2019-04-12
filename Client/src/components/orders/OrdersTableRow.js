import React from "react";
import LinkDetails from "../common/LinkDetails";
import {
  calculateOrderTotal,
  getProductsTitles,
  toCurrency,
  toShortDate
} from "../../services/helpers";
import { paths } from "../../constants/constants";

const OrderRow = props => {
  const {
    order,
    index,
    detailsLink: OrderDetailsLink, // myOrder, adminOrder
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
        {OrderDetailsLink ? (
          <LinkDetails
            name={paths.orderDetailsName}
            path={paths.orderDetailsPath + "/" + order._id}
            size="sm"
          />
        ) : null}
      </td>

      {/* Admin Actions: approve, deliver */}
      {ActionBtn && handleAction ? (
        <td>{<ActionBtn order={order} handleAction={handleAction} />}</td>
      ) : null}
    </tr>
  );
};

export default OrderRow;
