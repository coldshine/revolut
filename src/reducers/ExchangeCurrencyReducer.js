export const CHANGE_EXCHANGE_CURRENCY = 'exchange/currency/change';

export default function reducer(state = {
  from: 'USD',
  to: 'GBP',
}, action) {
  switch (action.type) {
    case CHANGE_EXCHANGE_CURRENCY:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}


export const changeExchangeFromCurrency = (from) => {
  return {type: CHANGE_EXCHANGE_CURRENCY, payload: {from}};
};

export const changeExchangeToCurrency = (to) => {
  return {type: CHANGE_EXCHANGE_CURRENCY, payload: {to}};
};