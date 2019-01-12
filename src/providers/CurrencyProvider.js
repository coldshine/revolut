import React from 'react';
import { connect } from 'react-redux';
import { changeExchangeRate } from '../reducers/ExchangeRateReducer';
import CurrencyExchangeRatesService from '../services/CurrencyExchangeRatesService';

class CurrencyProvider extends React.Component {

  constructor(props) {
    super(props);
    this.intervalId = null;
  }

  componentDidMount() {
    this.updateCurrencyRate();
    this.intervalId = setInterval(() => {
      this.updateCurrencyRate();
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  updateCurrencyRate() {
    CurrencyExchangeRatesService.fetch(this.props.exchangeCurrency.from).then(response => {
      const rate = parseFloat(response.data.rates[this.props.exchangeCurrency.to]);
      if (rate > 0) {
        this.props.dispatch(changeExchangeRate(rate));
      }
    });

  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

function mapStateToProps(state) {
  return {
    exchangeCurrency: state.exchangeCurrency
  };
}

export default connect(mapStateToProps)(CurrencyProvider);