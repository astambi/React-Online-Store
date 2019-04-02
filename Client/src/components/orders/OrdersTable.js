import React from "react";

const OrdersTable = props => {
  const { children } = props;

  return (
    <div className="container" style={{ paddingTop: 25 + "px" }}>
      <h1 className="text-center">My Orders</h1>
      <div className="row" style={{ paddingTop: 25 + "px" }}>
        <div className="col-md-12" id="customer-orders">
          <div className="box">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>View</th>
                  </tr>
                </thead>

                <tbody>{children}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;
