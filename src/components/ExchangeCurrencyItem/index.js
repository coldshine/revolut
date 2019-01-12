import React from 'react';
import PropTypes from 'prop-types';
import ExchangeCurrencySign from '../ExchangeCurrencySign';
import { connect } from "react-redux";
import { changeExchangeAmount } from '../../reducers/ExchangeAmountReducer';
import styles from './ExchangeCurrencyItem.module.css';

class ExchangeCurrencyItem extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.textInputRef = React.createRef();
  }

  normalizeExchangeAmount(amount) {
    amount = parseFloat(amount) || 0;
    amount = Math.abs(amount);
    amount = Math.max(0, amount);
    amount = Math.min(amount, this.props.availableAmount);
    return amount;
  }

  handleChange(event) {
    const exchangeAmount = this.normalizeExchangeAmount(event.target.value);
    this.props.dispatch(changeExchangeAmount(exchangeAmount));
  }

  getExchangeAmount() {
    if (!this.props.exchangeAmount) {
      return '';
    }
    return '-' + this.normalizeExchangeAmount(this.props.exchangeAmount);
  }

  getExchangeResult() {
    if (!this.props.exchangeAmount || this.props.exchangeAmount <= 0) {
      return '';
    }
    return '+' + (this.props.exchangeAmount * this.props.exchangeRate).toFixed(2);
  }

  focusOnInput() {
    if (this.textInputRef.current) {
      this.textInputRef.current.focus()
    }
  }

  componentDidMount() {
    this.focusOnInput();
  }

  componentDidUpdate() {
    this.focusOnInput();
  }

  render() {

    let valueOutput;
    if (this.props.hasInput) {
      valueOutput = <input ref={this.textInputRef} className={styles.input} type="text" pattern="\d*" value={this.getExchangeAmount()} onChange={this.handleChange} maxLength={6} />;
    } else {
      valueOutput = <div className={styles.result}>{this.getExchangeResult()}</div>;
    }

    return (

      <div className={styles.layout} data-currency={this.props.currency}>
        <div className={styles.layoutInner}>
          <div className={styles.currencyCode}>{this.props.currency}</div>
          <div>
            {valueOutput}
          </div>
        </div>
        <div>You have <ExchangeCurrencySign currency={this.props.currency}/>{this.props.availableAmount}</div>
      </div>
    );
  }

}

ExchangeCurrencyItem.propTypes = {
  currency: PropTypes.string.isRequired,
  availableAmount: PropTypes.number.isRequired,
  hasInput: PropTypes.bool,
  onChange: PropTypes.func
};

function mapStateToProps(state) {
  return {
    exchangeAmount: state.exchangeAmount,
    exchangeRate: state.exchangeRate
  };
}

export default connect(mapStateToProps)(ExchangeCurrencyItem);