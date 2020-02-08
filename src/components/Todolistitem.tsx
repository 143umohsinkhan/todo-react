import * as React from "react";
import {  ITodoItems } from "./constants";

interface IItemProp{
  item:ITodoItems;
  removeItem :(itemIndex:any) => void;
  markTodoDone:(itemIndex:any)=>void;
}


class TodoListItem extends React.Component<IItemProp, {}>{
  constructor(props: IItemProp) {
    super(props);
    this.onClickClose = this.onClickClose.bind(this);
    this.onClickDone = this.onClickDone.bind(this);
  }

  onClickClose() {
    var index = this.props.item.index-1;
    this.props.removeItem(index);
  }

  onClickDone() {
    var index = this.props.item.index-1;
    this.props.markTodoDone(index);
  }

  public render() {
    var todoClass = this.props.item.done ?
      "done" : "undone";
    return (
      <li className="list-group-item " onClick={this.onClickDone}>
        <div className={todoClass}>
          <span className="glyphicon glyphicon-ok icon" aria-hidden="true" ></span>
          {this.props.item.value}
          {/* <button type="button" className="close" onClick={this.onClickClose}>&times;</button> */}
        </div>
      </li>
    );
  }
}
export default TodoListItem;
