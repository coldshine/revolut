import '../setupTests';
import React from 'react';
import CurrencyExchangeRatesService from './CurrencyExchangeRatesService';

it('request returns data', () => {
  expect.assertions(1);
  return CurrencyExchangeRatesService.fetch('USD').then(data => expect(data.data.base).toEqual('USD'));
});

it('request will be rejected', () => {
  expect.assertions(1);
  return CurrencyExchangeRatesService.fetch()
    .then(data => {})
    .catch((reason) => {
      expect(reason).toEqual('no base currency was provided')
    });
});