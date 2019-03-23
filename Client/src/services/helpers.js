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

export { handleInputChange };
