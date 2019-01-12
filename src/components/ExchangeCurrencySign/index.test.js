import '../../setupTests';
import React from 'react';
import ExchangeCurrencySign from './index';
import { shallow } from 'enzyme';

it('should return USD currency sign', () => {
  const wrapper = shallow(<ExchangeCurrencySign currency={'USD'} />);
  const sign = '$';
  expect(wrapper.contains(sign)).toEqual(true);
});

it('should return EUR currency sign', () => {
  const wrapper = shallow(<ExchangeCurrencySign currency={'EUR'} />);
  const sign = '€';
  expect(wrapper.contains(sign)).toEqual(true);
});

it('should return GBP currency sign', () => {
  const wrapper = shallow(<ExchangeCurrencySign currency={'GBP'} />);
  const sign = '£';
  expect(wrapper.contains(sign)).toEqual(true);
});

it('should return RUB currency sign', () => {
  const wrapper = shallow(<ExchangeCurrencySign currency={'RUB'} />);
  const sign = '₽';
  expect(wrapper.contains(sign)).toEqual(true);
});

it('should return null and output console.warn', () => {
  const wrapper = shallow(<ExchangeCurrencySign  />);
  expect(wrapper.equals(null)).toBe(true);
});