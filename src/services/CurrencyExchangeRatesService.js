import axios from "axios/index";

export default class {
  static fetch(baseCurrency) {
    if (!baseCurrency) {
      return new Promise((resolve, reject) => {
        reject('no base currency was provided');
      });
    }
    const APP_ID = '95aa13885c9a4815a43fce01c8f392dd';

    return axios.get('https://openexchangerates.org/api/latest.json', {
      params: {
        'app_id': APP_ID,
        base: baseCurrency
      }
    })
  }
}