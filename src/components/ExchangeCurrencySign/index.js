export default ({currency}) => {
  if (!currency) {
    console.warn('currency code is not set');
    return null;
  }
  let currencySign;
  switch (currency) {
    case 'USD':
      currencySign = '$';
      break;
    case 'GBP':
      currencySign = '£';
      break;
    case 'EUR':
      currencySign = '€';
      break;
    case 'RUB':
      currencySign = '₽';
      break;
    default:
      currencySign = null;
      console.warn(currency + ' is unsupported currency code ');
  }
    return currencySign;
  };
