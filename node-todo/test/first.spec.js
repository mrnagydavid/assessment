import fs from 'fs';
import express from 'express';
import request from 'supertest';
import env from '../src/env';
import server from '../src/app';

describe('GET todos', () => {
  let app;
  beforeAll(() => {
    const data = [
      {
        "id": 1,
        "text": "Test",
        "priority": 1,
        "done": false
      }
    ];
    fs.writeFileSync(env.filename, JSON.stringify(data));
    app = server(express());
  });

  test('gets todos', () => {
    return request(app)
            .get("/todos")
            .then(response => {
              const todos = response.body;
              expect(todos.length).toEqual(1);
              expect(todos[0].id).toEqual(1);
              expect(todos[0].text).toEqual('Test');
              expect(todos[0].priority).toEqual(1);
              expect(todos[0].done).toEqual(false);
            });
  });
});

describe('POST todos', () => {
  let app;
  beforeAll(() => {
    const data = [
      {
        "id": 1,
        "text": "Test",
        "priority": 1,
        "done": false
      }
    ];
    fs.writeFileSync(env.filename, JSON.stringify(data));
    app = server(express());
  });

  test('add todo', () => {
    const test = { 
      text: 'Added todo',
      priority: 1,
      done: false
    };
    return request(app)
            .post("/todos")
            .send(test)
            .then(response => {
              const todo = response.body;
              expect(todo.id).toEqual(2);
              expect(todo.text).toEqual(test.text);
              expect(todo.priority).toEqual(test.priority);
              expect(todo.done).toEqual(test.done);
            });
  });
});