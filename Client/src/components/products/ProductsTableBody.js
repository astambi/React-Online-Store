import React, { Component } from "react";
import ProductTableRow from "./ProductTableRow";
import bookService from "../../services/book-service";

class ProductsTableBody extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      availableProducts: [] // ids
    };
  }

  componentDidMount = async () => {
    const { products } = this.props;
    const availableProducts = await bookService.filterAvailableBooks(products);
    this.setState({ availableProducts, isLoaded: true });
  };

  render() {
    const { isLoaded, availableProducts } = this.state;
    const { products, children } = this.props;

    console.log(this.props);

    if (!isLoaded) {
      return null;
    }

    return (
      <tbody>
        {products && products.length !== 0 ? (
          products.map(product =>
            product ? (
              <ProductTableRow
                key={product._id}
                product={product}
                isAvailable={availableProducts.includes(product._id)}
              >
                {/* Actions */}
                {children}
              </ProductTableRow>
            ) : null
          )
        ) : (
          <tr>
            <td colSpan="5">No books</td>
          </tr>
        )}
      </tbody>
    );
  }
}

export default ProductsTableBody;
