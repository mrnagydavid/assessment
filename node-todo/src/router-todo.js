import env from './env';
import express from 'express';
import TodoHandler from './model';

function routerTodo() {
  const todoHandler = new TodoHandler(env.filename);
  const router = express.Router();

  router.get('/', (req, res) => {
    console.log('router-todo', 'GET /');
    const todos = todoHandler.getAll();
    res.json(todos);
  });

  router.post('/', (req, res) => {
    console.log('router-todo', 'GET /');
    const newTodo = req.body;
    const addedTodo = todoHandler.add(newTodo);
    res.json(addedTodo);
  });

  router.get('/:id', (req, res) => {
    const id = req.params['id'];
    console.log('router-todo', 'GET /:id', id);
    const todo = todoHandler.get(id);
    res.json(todo);
  });

  router.put('/:id', (req, res) => {
    const id = req.params['id'];
    const newTodo = req.body;
    console.log('router-todo', 'PUT /:id', id, newTodo);
    const updatedTodo = todoHandler.update(id, newTodo);
    res.json(updatedTodo);
  });

  router.delete('/:id', (req, res) => {
    res.send('Success!');
  });
  
  return router;
}

export default routerTodo;
