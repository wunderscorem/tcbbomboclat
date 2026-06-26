import express from 'express';
import * as controller from '../controllers/index.js';

const router = express.Router();

// --- /api --- endpoints

router.get('/', (req, res) => {
    res.send(`
        Available api endpoints:
        GET /api/countries
        GET /api/country?type=code&value=USD
        GET /api/convert?from=USD&to=THB&amount=1000
        GET /api/rates?code=USD
    `);
});
router.get('/convert', controller.ConvertController.convert.fromAndTo);
router.get('/rates', controller.ConvertController.convert.getRates)
router.get('/countries', controller.CountryController.country.getAll);
router.get('/country', controller.CountryController.country.getCountry);

export default router;
