import express from 'express';
import cors from 'cors';
import logger from './utils/logger.js'

const Logger = logger.createLogger('index.js');
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("hello")
})

app.listen(5000, () => {
    Logger.info("server is running on localhost:5000")
});