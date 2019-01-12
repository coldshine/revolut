import { changeExchangeRate } from "../reducers/ExchangeRateReducer";
import CurrencyExchangeRatesService from '../services/CurrencyExchangeRatesService';
import {CHANGE_EXCHANGE_CURRENCY} from '../reducers/ExchangeCurrencyReducer';

export default store => next => action => {
  if (action.type === CHANGE_EXCHANGE_CURRENCY) {
    const state = store.getState();
    CurrencyExchangeRatesService.fetch(state.exchangeCurrency.from).then(response => {
      const rate = parseFloat(response.data.rates[action.payload.to]);
      if (rate > 0) {
        store.dispatch(changeExchangeRate(rate));
      }
    });
  }
  return next(action)
}