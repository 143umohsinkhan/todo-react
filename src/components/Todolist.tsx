import * as React from "react";
import { ITodolistProps } from "./constants";
import TodoListItem from "./Todolistitem";

class TodoList extends React.Component<ITodolistProps,{}> {
    
    public render() {
          var items = this.props.items.map((item, index) => {
            return (
              <TodoListItem key={index} item={item} removeItem={this.props.removeItem} markTodoDone={this.props.markTodoDone} />
            );
          });
        return (
             <ul className="list-group menu col-md-12"> {items} </ul>
        );
    }
}
export default TodoList;
