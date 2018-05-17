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
              return todo;
            })
            .then((todo) => {
              const file = fs.readFileSync(env.filename);
              const json = JSON.parse(file);
              expect(json.length).toEqual(2);
              expect(json[1]).toEqual(todo);
            });
  });
});

describe('GET todos/:id', () => {
  let app;
  let data;
  beforeAll(() => {
    data = [
      {
        "id": 1,
        "text": "Test",
        "priority": 1,
        "done": false
      },
      {
        "id": 10,
        "text": "Osteron",
        "priority": 2,
        "done": false
      }
    ];
    fs.writeFileSync(env.filename, JSON.stringify(data));
    app = server(express());
  });

  test('gets a todo', () => {
    const test = data[1];
    return request(app)
            .get(`/todos/${test.id}`)
            .then(response => {
              const todo = response.body;
              expect(todo.id).toEqual(test.id);
              expect(todo.text).toEqual(test.text);
              expect(todo.priority).toEqual(test.priority);
              expect(todo.done).toEqual(test.done);
            });
  });
});


describe('PUT todos/:id', () => {
  let app;
  let data;
  beforeAll(() => {
    data = [
      {
        "id": 1,
        "text": "Test",
        "priority": 1,
        "done": false
      },
      {
        "id": 10,
        "text": "Osteron",
        "priority": 2,
        "done": false
      }
    ];
    fs.writeFileSync(env.filename, JSON.stringify(data));
    app = server(express());
  });


  test('update a todo', () => {
    const test = {...data[1]};
    test.text = 'Hooray';
    test.priority = 3;

    return request(app)
            .put(`/todos/${test.id}`)
            .send(test)
            .then(response => {
              const todo = response.body;
              expect(todo.id).toEqual(test.id);
              expect(todo.text).toEqual(test.text);
              expect(todo.priority).toEqual(test.priority);
              expect(todo.done).toEqual(test.done);
              return todo;
            })
            .then((todo) => {
              const file = fs.readFileSync(env.filename);
              const json = JSON.parse(file);
              expect(json.length).toEqual(2);
              expect(json[1]).toEqual(todo);
            });
  });
});