// Do not turn into arrow function to keep original this.state
function handleInputChange(event, stateObj) {
  const { name, value } = event.target;

  const state = this.state[stateObj];
  state[name] = value;

  this.setState({
    [stateObj]: state
  });

  console.log(state);
}

const calculateOrderTotal = books => {
  let orderTotal = 0;
  books.map(book => {
    if (book && book.price && book.quantity) {
      orderTotal += book.price * book.quantity;
    }
  });
  return orderTotal;
};

const getProductsTitles = products =>
  products
    .filter(p => p !== null)
    .map(p => p.title)
    .join(", ");

const toCurrency = number => `$${(+number).toFixed(2)}`;
const toShortDate = dateStr => dateStr.slice(0, 16).replace("T", " ");

export {
  handleInputChange,
  calculateOrderTotal,
  getProductsTitles,
  toShortDate,
  toCurrency
};
