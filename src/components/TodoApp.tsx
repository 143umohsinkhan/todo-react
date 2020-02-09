import React from 'react';
import { ITodoItem } from '../../typings/types';
import ToDoHeader from "./Todoheader";
import TodoForm from "./TodoForm";
import TodoList from './Todolist';
import { DBServcies } from '../services/DBService';

interface TodoAppSState {
  todoItems: ITodoItem[];
}

class TodoApp extends React.Component<{}, TodoAppSState> {

  private db: DBServcies = new DBServcies();
  private currentIndex = 0;

  constructor() {
    super({});
    this.state = { todoItems: [] };
  }

  componentDidMount() {
    // this.db.Delete();
    this.refreshList();
  }

  addItem = (todoItemDesc: any) => {
    let item = { id: this.currentIndex + 1, value: todoItemDesc, done: false };
    this.db.Add(item);
    this.refreshList();
  }

  refreshList = () => {
    this.db.GetToDos((items: ITodoItem[]) => {
      this.currentIndex = items.length > 0 ? items[items.length - 1].id + 1 : 0;
      this.setState({ todoItems: items })
    });
  }

  markTodoDone = (itemIndex: any) => {
    let todo = this.state.todoItems.find(x => x.id == itemIndex);
    if (todo) {
      todo.done = !todo.done;
      this.db.Update(todo);
      this.refreshList();
    }
    else {
      console.warn("failed to find items in the list");
    }
  }

  render() {
    return (
      <div id="main">
        <ToDoHeader />
        <TodoList items={this.state.todoItems} markTodoDone={this.markTodoDone} />
        <TodoForm addItem={this.addItem} />
      </div>
    );
  }
}
export default TodoApp;