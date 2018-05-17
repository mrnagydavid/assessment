import express from 'express';
import bodyParser from 'body-parser';
import env from './env';
import routerTodo from './router-todo';

const app = express();
app.use(bodyParser.json());
app.use('/todos', routerTodo);
app.use('*', (req, res) => res.send('Boop'));

export default app;
