import * as React from "react";
import { ITodoItems } from "./constants";
import TodoListItem from "./Todolistitem";

interface ITodolistProps {
    items:ITodoItems[];
    removeItem :(itemIndex:any) => void;
    markTodoDone:(itemIndex:any)=>void;
}

class TodoList extends React.Component<ITodolistProps,{}> {
    
    public render() {
          var items = this.props.items.map((item, index) => {
            return (
              <TodoListItem key={index} item={item} removeItem={this.props.removeItem} markTodoDone={this.props.markTodoDone} />
            );
          });
        return (
             <ul className="list-group"> {items} </ul>
        );
    }
}
export default TodoList;
