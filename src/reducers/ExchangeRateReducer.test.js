import reducer from './ExchangeRateReducer'
import {changeExchangeRate, CHANGE_EXCHANGE_RATE} from './ExchangeRateReducer'

describe('reducers', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(0)
  })
})

describe('actions', () => {
  it('should create an action to change the exchange rate', () => {
    const expectedAction = {
      type: CHANGE_EXCHANGE_RATE,
      payload: 123
    };
    expect(changeExchangeRate(123)).toEqual(expectedAction)
  })
});