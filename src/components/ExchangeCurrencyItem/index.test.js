import '../../setupTests';
import React from 'react';
import ExchangeCurrencyItem from './index';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<ExchangeCurrencyItem />);
});

it('should render correctly', () => {
  const component = shallow(<ExchangeCurrencyItem />);
  expect(component).toMatchSnapshot();
});