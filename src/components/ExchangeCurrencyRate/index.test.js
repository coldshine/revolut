import '../../setupTests';
import React from 'react';
import ExchangeCurrencyRate from './index';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<ExchangeCurrencyRate />);
});

it('should render correctly', () => {
  const component = shallow(<ExchangeCurrencyRate />);
  expect(component).toMatchSnapshot();
});