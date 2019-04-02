import React from "react";

const ProductsTable = props => {
  const { children } = props;

  return (
    <div className="container">
      <table className="table table-hover table-condensed">
        {children || null}
      </table>
    </div>
  );
};

export default ProductsTable;
