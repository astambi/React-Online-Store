import React from "react";
import withLoading from "../hocs/withLoading";

const ProductsTable = props => {
  const { children } = props;

  return (
    <section className="table-container container">
      <table className="table">{children || null}</table>
    </section>
  );
};

// export default ProductsTable;
export default withLoading(ProductsTable);
