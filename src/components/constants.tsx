
export interface ITodoItems {
    index: number;
    value: string;
    done: boolean;
}

export const TodoItems: ITodoItems[] = [
    { index: 1, value: "learn react", done: false },
    { index: 2, value: "Go shopping", done: true },
    { index: 3, value: "buy flowers", done: true }];