// Do not turn into arrow function to keep original this.state
function handleInputChange(event, propertyName) {
  const { name, value } = event.target;

  const propertyValue = this.state[propertyName];
  propertyValue[name] = value;

  this.setState({ [propertyName]: propertyValue });
  console.log(propertyValue);
}

// Do not turn into arrow function to keep original this.state
function handleBlur(field, propertyName) {
  const propertyValue = this.state[propertyName];
  propertyValue[field] = true;

  this.setState({ [propertyName]: propertyValue });
}

// Do not turn into arrow function to keep original this.state
function updatePaginationState(items, pageLimit) {
  this.setState(prevState => {
    let { pagination } = prevState;
    pagination.currentPage = 1;
    pagination.totalPages = Math.max(1, Math.ceil(items.length / pageLimit)); // min 1

    return { pagination };
  });

  console.log(this.state.pagination);
}

function handlePageDecrease() {
  const { pagination } = this.state;
  if (pagination.currentPage === 1) {
    return;
  }

  updateCurrentPage.bind(this)(-1);
}

function handlePageIncrease() {
  const { pagination } = this.state;
  if (pagination.currentPage === pagination.totalPages) {
    return;
  }

  updateCurrentPage.bind(this)(1);
}

function updateCurrentPage(change) {
  this.setState(prevState => {
    const pagination = prevState.pagination;
    pagination.currentPage = pagination.currentPage + change;
    console.log(pagination);
    return { pagination };
  });
}

const filterCurrentPageItems = (items, currentPage, pageLimit) => {
  const itemsToDisplay = items.slice(
    pageLimit * (currentPage - 1),
    pageLimit * currentPage
  );

  return itemsToDisplay;
};

const calculateOrderTotal = books => {
  let orderTotal = 0;
  books
    .filter(
      book =>
        book !== null &&
        book !== undefined &&
        book.price !== null &&
        book.quantity !== null
    )
    .map(book => (orderTotal += book.price * book.quantity));
  return orderTotal;
};

const getProductsTitles = products =>
  products
    .filter(p => p !== null)
    .map(p => p.title)
    .join(", ");

const stringContains = (source, queryString) =>
  source.toLowerCase().includes(queryString.trim().toLowerCase());

const toCurrency = number => `$${(+number).toFixed(2)}`;
const toShortDate = dateStr => new Date(dateStr).toLocaleString("en-GB");

export {
  filterCurrentPageItems,
  handleBlur,
  handleInputChange,
  handlePageDecrease,
  handlePageIncrease,
  calculateOrderTotal,
  getProductsTitles,
  stringContains,
  toCurrency,
  toShortDate,
  updatePaginationState
};
