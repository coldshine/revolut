import '../../setupTests';
import React from 'react';
import ExchangeFromCurrency from './index';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<ExchangeFromCurrency />);
});

it('should render correctly', () => {
  const component = shallow(<ExchangeFromCurrency />);
  expect(component).toMatchSnapshot();
});