import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { paths } from "../../constants/constants";

const CartTableFooter = props => {
  const { orderTotal, checkout } = props;

  return (
    <tfoot>
      <tr>
        <td>
          <Link to={paths.storePath} className="btn btn-warning">
            <FontAwesomeIcon icon={faAngleLeft} /> Continue Shopping
          </Link>
        </td>
        <td colSpan="2" className="hidden-xs text-center">
          <strong>Total ${orderTotal}</strong>
        </td>
        <td colSpan="2">
          <button className="btn btn-success btn-block" onClick={checkout}>
            Checkout <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </td>
      </tr>
    </tfoot>
  );
};

export default CartTableFooter;
