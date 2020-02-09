import * as React from "react";
import { ITodolistProps } from "../../typings/types";
import TodoListItem from "./Todolistitem";

class TodoList extends React.Component<ITodolistProps,{}> {
    
    public render() {
      var items = this.props.items.map((item, index) => {
            return (
              <TodoListItem key={index} item={item} markTodoDone={this.props.markTodoDone} />
            );
          });
        return (
             <ul className="list-group menu col-md-12"> {items} </ul>
        );
    }
}
export default TodoList;
