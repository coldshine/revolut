import React from 'react';
import ExchangeCurrencySign from '../ExchangeCurrencySign';
import { connect } from "react-redux";
import styles from './ExchangeCurrencyRateStyles.module.css';

class ExchangeCurrencyRate extends React.Component {

  constructor(props) {
    super(props);
    this.isLowSpeed = false;
  }

  componentDidUpdate () {
    const rate = this.props.exchangeRate;
    clearTimeout(this.timeoutId);
    if (!this.isLowSpeed && !rate) {
      this.timeoutId = setTimeout(() => {
        this.isLowSpeed = true;
      }, 1000);
    } else {
      this.isLowSpeed = false;
    }
  }

  render() {
    const exchangeFrom = this.props.exchangeCurrency.from;
    const exchangeTo = this.props.exchangeCurrency.to;
    const rate = this.props.exchangeRate;
    const isLowSpeed = this.isLowSpeed;
    let html = (
      <div className={styles.rate}>
        <ExchangeCurrencySign currency={exchangeFrom} />1 = <ExchangeCurrencySign currency={exchangeTo} />{rate}
      </div>
    );
    if (!rate) {
      html = '';

      // in case if request is quite slow we show this note
      if (isLowSpeed) {
        html = (<div className={styles.rate}>
          Updating exchange rate, please wait...
        </div>);
      }
    }
    return html;
  }
}

function mapStateToProps(state) {
  return {
    exchangeCurrency: state.exchangeCurrency,
    exchangeRate: state.exchangeRate
  };
}

export default connect(mapStateToProps)(ExchangeCurrencyRate);