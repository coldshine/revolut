import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import reducers from './reducers';
import { createLogger } from 'redux-logger';
import DevTools from './components/DevTools';
import ExchangeCurrency from './components/ExchangeCurrency';
import CurrencyProvider from './providers/CurrencyProvider';
import CurrencyMiddleware from './middlewares/CurrencyMiddleware';

import './App.css';

const initialState = {};
let enhance;
if (true) {
  const logger = createLogger({
    predicate: (getState, action) => action.type !== 'EFFECT_TRIGGERED' && action.type !== 'EFFECT_RESOLVED'
  });
  enhance = compose(applyMiddleware(CurrencyMiddleware, logger), DevTools.instrument());
} else {
  enhance = applyMiddleware(CurrencyMiddleware);
}
const store = createStore(reducers, initialState, enhance);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <CurrencyProvider>
          <div className="app">
            <ExchangeCurrency />
          </div>
        </CurrencyProvider>
        <DevTools />
      </Provider>
    );
  }
}

export default App;
