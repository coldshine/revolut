import React from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import ExchangeCurrencyItem from '../ExchangeCurrencyItem';
import ExchangeCurrencyRate from '../ExchangeCurrencyRate';
import { changeExchangeFromCurrency } from '../../reducers/ExchangeCurrencyReducer';
import { changeExchangeToCurrency } from '../../reducers/ExchangeCurrencyReducer';
import { changeExchangeRate } from '../../reducers/ExchangeRateReducer';
import { changeExchangeAmount } from '../../reducers/ExchangeAmountReducer';

import styles from './ExchangeCurrency.module.css';

class ExchangeFromCurrency extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.exchangeCurrencySlideActiveIndex = {
      from: 0,
      to: 0
    }
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  resetExchangeRateAndAmount() {
    this.props.dispatch(changeExchangeRate(0));
    this.props.dispatch(changeExchangeAmount(0));
  }

  getActiveCurrency(fromOrTo) {
    const selectedCurrencyDomSelector = `[data-exchange="${fromOrTo}"] .slick-active [data-currency]`;
    return document.querySelector(selectedCurrencyDomSelector).getAttribute('data-currency');
  }

  render() {
    const exchangeFrom = this.props.exchangeCurrency.from;
    const exchangeTo = this.props.exchangeCurrency.to;
    const currenciesFrom = [];
    const currenciesTo = [];
    // walk through all currencies in the wallet
    this.props.wallet.forEach((item) => {

      // we need to set a unique key for each ExchangeCurrencyItem's container
      const key = item.currency + item.amount;

      // because openexchangerates.org allows to use only USD as a base currency for free we have to limit exchange source currencies
      // toDo remove next condition if there'll be payed account
      if (item.currency === 'USD') {
        // source currency must not be the same as the target
        if (item.currency !== currenciesTo) {
          currenciesFrom.push(
            <div key={'from' + key}  className={styles.exchangeCurrencyItem} >
              <ExchangeCurrencyItem
                currency={item.currency}
                availableAmount={item.amount}
                hasInput={true}
              />
            </div>
          );
        }
      }

      if (item.currency !== exchangeFrom) {
        // target currency must not be the same as the source
        currenciesTo.push(
          <div key={'to' + key}  className={styles.exchangeCurrencyItem} >
            <ExchangeCurrencyItem
              currency={item.currency}
              availableAmount={item.amount}
              hasInput={false}
            />
          </div>
        );
      }

      // because the whole component will be re-rendered every time we change currency
      // we want to show just selected currency after render
      // so we save source & target currencies to show proper initial slide after render
      if (item.currency === exchangeFrom) {
        this.exchangeCurrencySlideActiveIndex.from = currenciesFrom.length - 1;
      }
      if (item.currency === exchangeTo) {
        this.exchangeCurrencySlideActiveIndex.to = currenciesTo.length - 1;
      }

    });

    //we have to split settings for top and bottom sliders to distinguish these sliders in slick events
    const sliderSettingsBase = {
      dots: true,
      infinite: true,
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    const sliderSettingsFrom = {
      ...sliderSettingsBase,
      initialSlide: this.exchangeCurrencySlideActiveIndex.from,
      init: () => {
        document.querySelector('[data-exchange-from] .slick-active input').focus();
        console.log(document.querySelector('[data-exchange-from] .slick-active input'));
      },
      beforeChange: () => {
        this.resetExchangeRateAndAmount();
      },
      afterChange: (slideIndex) => {
        const fromCurrency = this.getActiveCurrency('from');
        this.props.dispatch(changeExchangeFromCurrency(fromCurrency));
        this.resetExchangeRateAndAmount();
      }
    };
    const sliderSettingsTo = {
      ...sliderSettingsBase,
      initialSlide: this.exchangeCurrencySlideActiveIndex.to,
      beforeChange: () => {
        this.resetExchangeRateAndAmount();
      },
      afterChange: (slideIndex) => {
        const toCurrency = this.getActiveCurrency('to');
        this.props.dispatch(changeExchangeToCurrency(toCurrency));
        this.resetExchangeRateAndAmount();
      }
    };
    return (
      <div className="screen screen--exchange">
        <div className={styles.exchange}>
          <ExchangeCurrencyRate />
          <div className={styles.exchangeFrom} data-exchange="from">
            <Slider key={'from' + Date.now()} {...sliderSettingsFrom}>
              {currenciesFrom}
            </Slider>
          </div>
          <div className={styles.exchangeTo} data-exchange="to">
            <Slider key={'to' + Date.now()} {...sliderSettingsTo}>
              {currenciesTo}
            </Slider>
          </div>
        </div>
      </div>

    );
  }

}

function mapStateToProps(state) {
  return {
    exchangeCurrency: state.exchangeCurrency,
    wallet: state.wallet.currencies
  };
}

export default connect(mapStateToProps)(ExchangeFromCurrency);