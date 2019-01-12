import axios from "axios/index";

export default class {
  static fetch(baseCurrency) {
    if (!baseCurrency) {
      return new Promise((resolve, reject) => {
        reject('no base currency was provided');
      });
    }
    const APP_ID = '000ef6df0ced4be1bbb6e464f5c809cc';

    return axios.get('https://openexchangerates.org/api/latest.json', {
      params: {
        'app_id': APP_ID,
        base: baseCurrency
      }
    })
  }
}