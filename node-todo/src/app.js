import bodyParser from 'body-parser';
import env from './env';
import routerTodo from './router-todo';

function server(app) {
  console.log('app.js', 'configuring new server app');
  app.use(bodyParser.json());
  app.use('/todos', routerTodo());
  app.use('*', (req, res) => res.send('Boop'));
  return app;
}

export default server;
