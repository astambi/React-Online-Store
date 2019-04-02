import React from "react";
import { toCurrency } from "../../services/helpers";

const OrderDetailsTableFooter = props => {
  const { orderTotal } = props;

  return (
    <tfoot className="font-weight-bold">
      <tr>
        <td colSpan={2} />
        <td>Total:</td>
        <td className="text-center">{toCurrency(orderTotal)}</td>
      </tr>
    </tfoot>
  );
};

export default OrderDetailsTableFooter;
