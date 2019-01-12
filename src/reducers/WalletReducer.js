export const UPDATE_MONEY_AMOUNT = 'wallet/money/change';

export default function reducer(state = {
  currencies: [
    {currency: 'USD', amount: 25.3},
    {currency: 'GBP', amount: 100},
    {currency: 'EUR', amount: 200},
    {currency: 'RUB', amount: 5000},
  ]
}, action) {
  switch (action.type) {
    case UPDATE_MONEY_AMOUNT:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}

export const updateAmountInWallet = (currency, amount) => {
  return {type: UPDATE_MONEY_AMOUNT, payload: {currency, amount}};
};