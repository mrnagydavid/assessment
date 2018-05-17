import fs from 'fs';

class TodoHandler {
  constructor(filename) {
    console.log('TodoHandler', 'ctor');
    const buffer = fs.readFileSync(filename, 'utf8');
    this.todos = JSON.parse(buffer);
  }

  getAll() {
    console.log('TodoHandler', 'getAll');
    return this.todos;
  }
  add(todo) {}
  update(todoId, todo) {}
  remove(todoId) {}
}

export default TodoHandler;
