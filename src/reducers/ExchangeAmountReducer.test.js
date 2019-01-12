import {changeExchangeAmount, CHANGE_EXCHANGE_AMOUNT} from './ExchangeAmountReducer'
import reducer from "./ExchangeAmountReducer";

describe('reducers', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(0)
  })
})

describe('actions', () => {
  it('should create an action to change the exchange amount', () => {
    const expectedAction = {
      type: CHANGE_EXCHANGE_AMOUNT,
      payload: 123
    };
    expect(changeExchangeAmount(123)).toEqual(expectedAction)
  })
});