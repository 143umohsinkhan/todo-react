
export interface ITodoItem {
    id: number;
    value: string;
    done: boolean;
}

export interface ITodolistProps {
    items: ITodoItem[];
    markTodoDone: (itemIndex: any) => void;
}
