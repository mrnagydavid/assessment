import express from 'express';
import bodyParser from 'body-parser';
import env from './env';

const app = express();
app.use(bodyParser.json());
app.use('/', (req, res) => res.send('Boop'));

export default app;