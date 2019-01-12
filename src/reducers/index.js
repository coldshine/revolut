import { combineReducers } from 'redux';
import ExchangeCurrencyReducer from './ExchangeCurrencyReducer';
import ExchangeRateReducer from './ExchangeRateReducer';
import ExchangeAmountReducer from './ExchangeAmountReducer';
import WalletReducer from './WalletReducer';

const rootReducer = combineReducers({
  exchangeCurrency: ExchangeCurrencyReducer,
  exchangeAmount: ExchangeAmountReducer,
  exchangeRate: ExchangeRateReducer,
  wallet: WalletReducer
});

export default rootReducer;
