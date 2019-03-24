import React from "react";

const CartTable = props => {
  const { children } = props;

  return (
    <div className="container">
      <table id="cart" className="table table-hover table-condensed">
        {children}
      </table>
    </div>
  );
};

export default CartTable;
