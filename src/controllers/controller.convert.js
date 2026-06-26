import {CountryDal} from '../dal/dal.country.js'

export const convert = {
  // GET /api/convert?from=USD&to=THB&amount=1000
  fromAndTo: async (req, res) => {
    const { from, to, amount } = req.query;
    if (!from || !to) {
      return res.status(400).json({ error: 'Bad Request: No "from", "to", "amount" params provided.' });
    }
    try {
      const result = 'not done'
      return res.json(result);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
  getRates: async (req, res) => {
    const { code } = req.query;
    if (!code) {
      return res.status(400).json({ error: 'Bad Request: No country "code" params provided.' });
    }

    const isCodeValid = CountryDal.getByT("code", code)

    try {
      const result = 'not done'
      return res.json(result);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
};
