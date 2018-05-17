import fs from 'fs';

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
    this.todos = JSON.parse(buffer);
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

  save(newTodo) {
    return new Promise((resolve, reject) => {
      fs.writeFile(this.filename, JSON.stringify([...this.todos, newTodo]), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  getAll() {
    console.log('TodoHandler', 'getAll');
    return this.todos;
  }

  add(todo) {
    console.log('TodoHandler', 'add', todo);
    const newTodo = {
      'id':       ++this.maxId,
      'text':     (typeof todo.text === 'string') ? todo.text : '',
      'priority': (todo.priority >= 1 && todo.priority <= 5) ? todo.priority : 1,
      'done':     (todo.done === true) ? true : false
    };

    this.save(newTodo)
    .then(() => {
      this.todos.push(newTodo);
    })
    .catch((err) => {
      console.error(err);
    });

    return newTodo;
  }

  update(todoId, todo) {}
  remove(todoId) {}
}

export default TodoHandler;
