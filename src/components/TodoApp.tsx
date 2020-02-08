import React from 'react';
import { TodoItems } from './constants';
import ToDoHeader from "./Todoheader";
import TodoForm from "./TodoForm";
import TodoList from './Todolist';
//import * as sqlite3 from 'sqlite3';

class TodoApp extends React.Component<{}, {}> {

  constructor({ }) {
    super({});
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.markTodoDone = this.markTodoDone.bind(this);
    this.state = { todoItems: TodoItems };
   // this.InitDB();
  }
  // InitDB() {
  //   var db = new sqlite3.Database('test.db');

  //   db.run("INSERT INTO memos VALUES('TEST', 5000)");

  //   db.each("SELECT * FROM memos", (err, row) => {
  //     console.log(row.text);
  //   });

  //   db.close();
  // }

  addItem(todoItemDesc: any) {
    TodoItems.push({
      index: TodoItems.length + 1,
      value: todoItemDesc,
      done: false
    });
    this.setState({ todoItems: TodoItems });
  }

  removeItem(itemIndex: any) {
    TodoItems.splice(itemIndex, 1);
    this.setState({ todoItems: TodoItems });
  }

  markTodoDone(itemIndex: any) {
    var todo = TodoItems[itemIndex];
    // TodoItems.splice(itemIndex, 1);
    todo.done = !todo.done;
    //todo.done ? TodoItems.push(todo) : TodoItems.unshift(todo);
    this.setState({ todoItems: TodoItems });
  }

  render() {
    return (
      <div id="main">
        <ToDoHeader />
        <TodoList items={TodoItems} removeItem={this.removeItem} markTodoDone={this.markTodoDone} />
        <TodoForm addItem={this.addItem} />
      </div>
    );
  }
}
export default TodoApp;