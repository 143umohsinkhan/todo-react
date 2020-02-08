import * as React from "react";

interface ITodoFormProps {
    addItem: (todoItem: any) => void;
}

interface IToDoFormState {
    value: string;
}

class TodoForm extends React.Component<ITodoFormProps, IToDoFormState> {

    descInput: React.RefObject<HTMLInputElement>;

    constructor(props: ITodoFormProps) {
        super(props);
        this.descInput = React.createRef();
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = { value: '' };
    }

    componentDidMount() {
        this.descInput.current?.focus();
    }

    handleChange(event: any) {
        let todoDesc = event.target.value;
        if (todoDesc || todoDesc.trim()) {
            this.setState({ value: todoDesc });
        }
    }

    onSubmit(event: any) {
        event.preventDefault();
        if (this.state.value && this.state.value.trim()) {
            this.props.addItem(this.state.value);
            this.setState({ value: '' });
        }
    }

    render() {
        return (
            <form ref="form" onSubmit={this.onSubmit} className="form-inline">
                <input type="text" value={this.state.value} onChange={this.handleChange} className="form-control" ref={this.descInput} placeholder="add a new todo..." />
                <button type="submit" className="btn btn-primary">Add</button>
            </form>
        );
    }
}

export default TodoForm;
