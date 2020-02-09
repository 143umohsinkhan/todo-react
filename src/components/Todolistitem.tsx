import * as React from "react";
import { ITodoItem } from "../../typings/types";

interface IItemProp {
  item: ITodoItem;
  markTodoDone: (itemIndex: any) => void;
}


class TodoListItem extends React.Component<IItemProp, {}>{
  constructor(props: IItemProp) {
    super(props);
  }

  onClickDone = () => {
    var index = this.props.item.id ;
    this.props.markTodoDone(index);
  }

  public render() {
    const todoClass = this.props.item.done  ?
      "done" : "undone";
    const iconclass = !this.props.item.done ? "unchecked" : "check";

    return (
      <li className="list-group-item " onClick={this.onClickDone}>
        <div className={todoClass}>
          <span className={`glyphicon glyphicon-${iconclass} icon`} aria-hidden="true" ></span>
          {this.props.item.value}
        </div>
      </li>
    );
  }
}
export default TodoListItem;
