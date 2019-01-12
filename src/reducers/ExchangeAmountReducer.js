export const CHANGE_EXCHANGE_AMOUNT = 'exchange/amount/change';

export default function reducer(state = 0, action) {
  switch (action.type) {
    case CHANGE_EXCHANGE_AMOUNT:
      return action.payload;
    default:
      return state;
  }
}

export const changeExchangeAmount = (amount) => {
  return {type: CHANGE_EXCHANGE_AMOUNT, payload: amount};
};