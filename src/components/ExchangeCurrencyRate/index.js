import React from 'react';
import ExchangeCurrencySign from '../ExchangeCurrencySign';
import { connect } from "react-redux";
import styles from './ExchangeCurrencyRateStyles.module.css';

class ExchangeCurrencyRate extends React.Component {
  render() {
    clearTimeout(this.timeoutId);
    const exchangeFrom = this.props.exchangeCurrency.from;
    const exchangeTo = this.props.exchangeCurrency.to;
    const rate = this.props.exchangeRate;
    let html = (
      <div className={styles.rate}>
        <ExchangeCurrencySign currency={exchangeFrom} />1 = <ExchangeCurrencySign currency={exchangeTo} />{rate}
      </div>
    );
    if (!rate) {
      html = '';

      // in case if request is quite slow we show this note
      this.timeoutId = setTimeout(() => {
        html = (<div className={styles.rate}>
          Updating exchange rate, please wait...
        </div>);
      }, 300);
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