import { createLogger } from '../../utils/logger.js';
import { CONFIG } from '../../config/index.js'

const api = CONFIG.API_URL;
const logger = createLogger('dal.country');

let store = []; // type: { code: string, name: string, symbol: string }[]

export const CountryDal = {
  init: async () => {
    try {
      logger.info('Initializing currency store from frankfurter API');
      const res = await fetch(`${api}/currencies`);
      const data = await res.json();
      store = data.map((c) => ({ code: c.iso_code, name: c.name, symbol: c.symbol }));
      logger.info(`Loaded ${store.length} currencies`);
    } catch (err) {
      logger.error(`Failed to initialize CountryDal: ${err.message}`);
    }
  }, 

  getAll: () => {
    logger.debug(`getAll -> ${store.length} items`);
    return store;
  },

  getByT: (t, value) => { // t = "name" | "symbol" | "code"
    if (!t) throw new Error('T is required');
    if(!['name', 'symbol', 'code'].includes(t)) throw new Error('NO TYPE');
    const result = store.filter((c) => c[t] === value);
    logger.debug(`getByT(${t}, ${value}) -> ${result.length} items`);
    return result;
  }
};

// example:
// [
//     {
//         "iso_code": "AED",
//         "iso_numeric": "784",
//         "name": "United Arab Emirates Dirham",
//         "symbol": "د.إ",
//         "start_date": "1996-04-11",
//         "end_date": "2026-06-16"
//     },