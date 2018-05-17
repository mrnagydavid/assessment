import express from 'express';
import env from './env';
import TodoHandler from './model';

const todoHandler = new TodoHandler(env.filename);
const router = express.Router();

router.get('/', (req, res) => {
  console.log('router-todo', 'GET /');
  const todos = todoHandler.getAll();
  res.json(todos);
});

router.post('/', (req, res) => {
  res.send('Success!');
});

router.get('/:id', (req, res) => {
  res.send('Success!');
});

router.put('/:id', (req, res) => {
  res.send('Success!');
});

router.delete('/:id', (req, res) => {
  res.send('Success!');
});

export default router;
