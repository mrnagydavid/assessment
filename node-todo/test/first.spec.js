import request from 'supertest';
import app from '../src/app';

describe('GET todos', () => {
  test('gets todos', () => {
    return request(app)
            .get("/todos")
            .then(response => {
              const todos = response.body;
              console.log(JSON.stringify(response));
              expect(todos.length).toEqual(1);
              expect(todos[0].id).toEqual(1);
              expect(todos[0].text).toEqual('Test');
              expect(todos[0].priority).toEqual(1);
              expect(todos[0].done).toEqual(false);
            });
  });
});