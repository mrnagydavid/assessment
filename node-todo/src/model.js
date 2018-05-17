import fs from 'fs';
import Todo from './todo';

class TodoHandler {
  /*
    this.filename: string
    this.todos: Todo[]
    this.maxId: number
  */

  constructor(filename) {
    console.log('TodoHandler', 'ctor');
    if (!filename || typeof filename !== 'string' || filename.length === 0) {
      throw new Error('Missing filename')
    }
    this.filename = filename;
    const buffer = fs.readFileSync(filename, 'utf8');
    this.rawTodos = JSON.parse(buffer);
    this.todos = this.rawTodos.map((raw) => new Todo(raw));
    this.setup();
  }

  setup() {
    this.maxId = 0;
    this.todos.forEach((todo) => {
      if (todo.id > this.maxId) {
        this.maxId = todo.id;
      }
    });
  }

  saveAppend(newTodo) {
    console.log('TodoHandler', 'saveAppend', newTodo);
    return this.save([...this.todos, newTodo]);
  }

  saveUpdate(id, updatedTodo) {
    console.log('TodoHandler', 'saveUpdate', id, updatedTodo);
    const data = this.todos.map((todo) => {
      if (todo.id === id) {
        return updatedTodo;
      } else {
        return todo;
      }
    });
    return this.save(data);
  }

  save(data) {
    console.log('TodoHandler', 'save', data);
    return new Promise((resolve, reject) => {
      fs.writeFile(this.filename, JSON.stringify(data), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  getAll() {
    console.log('TodoHandler', 'getAll');
    return this.todos;
  }

  get(todoId) {
    console.log('TodoHandler', 'get', todoId, this.todos);
    const id = Number.parseInt(todoId);
    if (Number.isNaN(id)) {
      return {};
    }
    const todo = this.todos.find((todo) => todo.id === id);
    return todo || {};
  }

  add(todo) {
    console.log('TodoHandler', 'add', todo);
    todo.id = ++this.maxId;
    const newTodo = new Todo(todo);
    console.log(newTodo);

    this.saveAppend(newTodo)
    .then(() => {
      this.todos.push(newTodo);
    })
    .catch((err) => {
      console.error(err);
    });

    return newTodo;
  }

  update(todoId, newTodo) {
    console.log('TodoHandler', 'update', todoId, newTodo);
    const id = Number.parseInt(todoId);

    if (Number.isNaN(id)) {
      return {};
    }

    const todo = this.get(todoId);
    if (!todo.id) {
      // Didn't find the todo
      // Fail silently :(
      return {};
    }

    const updatedTodo = new Todo(todo.toJSON());
    for (let key in newTodo) {
      updatedTodo[key] = newTodo[key];
    }
    
    this.saveUpdate(id, updatedTodo)
    .then((newTodos) => {
      this.todos = newTodos;
    })
    .catch((err) => {
      console.error(err);
    });

    return updatedTodo;
  }

  remove(todoId) {}
}

export default TodoHandler;
