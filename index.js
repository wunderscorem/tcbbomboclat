import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import logger from './utils/logger.js'
import apiRoutes from './src/routes/index.js';
import { CountryDal } from './src/dal/dal.country.js';

dotenv.config();

import { CONFIG } from './config/index.js';

const Logger = logger.createLogger('index.js');
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("hello")
})

app.use("/api", apiRoutes)

await CountryDal.init();

app.listen(CONFIG.PORT, () => {
    Logger.info("server is running on localhost:" + CONFIG.PORT)
});