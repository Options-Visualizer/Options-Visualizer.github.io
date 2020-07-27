import { createStore } from 'redux'

const initialState = {
  ticker: ''
};

export const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
// Reducer
function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_TICKER':
      return {
        ticker: action.payload
      };
    default:
      return state;
  }
}
// Actions
export const changeTickerAction = (ticker) => ({
  type: 'CHANGE_TICKER',
  payload: ticker
});
