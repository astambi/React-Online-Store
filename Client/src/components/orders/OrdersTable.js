import React from "react";

const OrdersTable = props => {
  const { title, children } = props;

  return (
    <section className="orders">
      <h1 className="text-center text-capitalize">
        {title || "Filter orders by status"}
      </h1>

      <section className="table-container container">
        <table className="table table-hover">
          {/* header, body, footer */}
          {children}
        </table>
      </section>
    </section>
  );
};

export default OrdersTable;
