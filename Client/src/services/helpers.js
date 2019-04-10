// Do not turn into arrow function to keep original this.state
function handleInputChange(event, propertyName) {
  const { name, value } = event.target;

  const propertyValue = this.state[propertyName];
  propertyValue[name] = value;

  this.setState({ [propertyName]: propertyValue });
  console.log(propertyValue);
}

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
  handleInputChange,
  calculateOrderTotal,
  getProductsTitles,
  stringContains,
  toShortDate,
  toCurrency
};
