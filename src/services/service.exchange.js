import { createLogger } from '../../utils/logger.js';
import { CONFIG } from '../../config/index.js'

const logger = createLogger('exchange service');

export const ExchangeService = {
  // Convert: fetch all rates for `from`, then pick the `to` row.
  convert: async ({ from, to, amount = 1 }) => {
    if (!from || !to) throw new Error('from and to are required');

    const f = String(from).toUpperCase();
    const t = String(to).toUpperCase();
    const url = `${CONFIG.API_URL}/rates?base=${f}`;
    logger.info(`GET ${url}`);

    const res = await fetch(url);
    if (!res.ok) throw new Error(`api fail: ${res.status}`);

    const data = await res.json(); // [{ date, base, quote, rate }, ...]
    const row = data.find((r) => r.quote === t);
    if (!row) throw new Error(`unknown currency: ${f} or ${t}`);

    const amt = Number(amount) || 1;
    return { from: f, to: t, amount: amt, rate: row.rate, result: row.rate * amt, date: row.date };
  },
  getRates: async ({ base = 'EUR' } = {}) => {
    const b = String(base).toUpperCase();
    const url = `${CONFIG.API_URL}/rates?base=${b}`;
    logger.info(`GET ${url}`);

    const res = await fetch(url);
    if (!res.ok) throw new Error(`api fail: ${res.status}`);

    const data = await res.json(); // [{ date, base, quote, rate }, ...]
    const rates = Object.fromEntries(data.map((r) => [r.quote, r.rate]));
    return { base: b, date: data[0]?.date, rates };
  },
};