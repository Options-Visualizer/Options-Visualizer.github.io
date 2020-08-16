const currentSymbol = (state = "", action) => {
  switch (action.type) {
    case 'CHANGE_SYMBOL':
      return action.symbol
    default:
      return state;
  }
}

export default currentSymbol;