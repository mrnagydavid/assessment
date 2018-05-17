class Todo {
  constructor(json) {
    this._id = json.id ? json.id : 0;
    this.text = json.text ? json.text : '';
    this._priority = json.priority ? json.priority : 1;
    this.done = json.done === true ? true : false;
  }

  get id() {
    return this._id || 0;
  }

  set id(newValue) {
    if (this.id !== 0 && Number.isInteger(newValue)) {
      this._id = newValue;
    }    
  }

  get priority() {
    return this._priority;
  }

  set priority(newValue) {
    if (typeof newValue === 'number' && newValue >= 1 && newValue <= 5) {
      this._priority = newValue;
    }
  }

  toJSON() {
    return {
      id: this._id,
      text: this.text,
      priority: this._priority,
      done: this.done
    };
  }
}

export default Todo;
