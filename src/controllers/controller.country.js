
import { CountryDal } from '../dal/dal.country.js';

export const country = {
    getAll: async (req, res) => {
        try {
            const result = CountryDal.getAll();
            return res.json(result);
        }catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },
    getCountry : async (req, res) => {
        const { type, value } = req.query;
        if (!type) {
            return res.status(400).json({ error: 'Bad Request: Type is required' });
        }
        if(!['name', 'symbol', 'code'].includes(type)) {
            return res.status(400).json({ error: 'Bad Request: Type must be "name", "symbol" or "code"' });
        }
        if(type === 'symbol') {
            if (!symbol) {
               return res.status(400).json({ error: 'Bad Request: Symbol is required' });
            }   
            if(typeof symbol !== 'string') {
                return res.status(400).json({ error: 'Bad Request: Symbol must be a string' });
            }
            if(symbol.length !== 1) {
                return res.status(400).json({ error: 'Bad Request: Symbol must be a single character' });
            }
        }
        if(!value) {
            return res.status(400).json({ error: 'Bad Request: Value is required' });
        }

        try {
            const search = type === 'code' ? value.toUpperCase() : value;
            const result = CountryDal.getByT(type, search);

            if (result.length === 0) {
                return res.status(404).json({ error: `Not Found: no country with ${type} "${value}"` });
            }
            return res.json(result);
        }
        catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
}