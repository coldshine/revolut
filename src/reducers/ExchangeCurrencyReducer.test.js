import {changeExchangeFromCurrency, changeExchangeToCurrency, CHANGE_EXCHANGE_CURRENCY} from './ExchangeCurrencyReducer'
import reducer from "./ExchangeCurrencyReducer";

describe('reducers', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      from: 'USD',
      to: 'GBP',
    })
  })
})

describe('actions', () => {
  it('should create an action to change the source currency', () => {
    const expectedAction = {
      type: CHANGE_EXCHANGE_CURRENCY,
      payload: {
        from: 'USD'
      }
    };
    expect(changeExchangeFromCurrency('USD')).toEqual(expectedAction)
  })

  it('should create an action to change the target currency', () => {
    const expectedAction = {
      type: CHANGE_EXCHANGE_CURRENCY,
      payload: {
        to: 'GBP'
      }
    };
    expect(changeExchangeToCurrency('GBP')).toEqual(expectedAction)
  })
});