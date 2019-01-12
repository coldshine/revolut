export const CHANGE_EXCHANGE_RATE = 'exchange/rate/change';

export default function reducer(state = 0, action) {
  switch (action.type) {
    case CHANGE_EXCHANGE_RATE:
      return action.payload;
    default:
      return state;
  }
}

export const changeExchangeRate = (rate) => {
  return {type: CHANGE_EXCHANGE_RATE, payload: rate};
};