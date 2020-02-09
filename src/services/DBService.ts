import { ITodoItem } from '../../typings/types';

export class DBServcies {

    private todoDatabase: any;
    private readonly tableName: string = 'todo';

    constructor() {
        this.initDB();
        this.createTable();
    }

    GetToDos(callback: any) {
        this.getTransaction((tx:any) => {
            tx.executeSql(`SELECT * FROM ${this.tableName}`, [], (t:any,r: any) => {
                let items: ITodoItem[] = [];
                console.log(r.rows.length);
                console.log(t);
                for (let i = 0; i < r.rows.length; i++) {
                    let item: ITodoItem = {
                        id: r.rows.item(i).id,
                        done: r.rows.item(i).done === "true" ? true : false,
                        value: r.rows.item(i).value
                    }
                    items.push(item);
                }
                callback(items);
            });
        });
    }

    Delete() {
        this.getTransaction((tx:any) => {
            tx.executeSql(`delete from ${this.tableName}`, [], (t:any,r: any) => this.result(t,r), (t: any, e: any) => this.transError(t, e));
        });
    }

    Add(item: ITodoItem) {
        this.getTransaction((tx:any) => {
            tx.executeSql(`insert into ${this.tableName}(id,value,done) values(?,?,?)`, [item.id, item.value, item.done], (t:any,r: any) => this.result(t,r), (t: any, e: any) => this.transError(t, e));
        });
    }

    Update(item: ITodoItem) {
        this.getTransaction((tx:any) => {
            tx.executeSql(`UPDATE ${this.tableName} Set value = ?, done = ? where id =?`, [item.value, item.done, item.id], (t:any,r: any) => this.result(t,r), (t: any, e: any) => this.transError(t, e));
        });
    }

    private getTransaction(callback: any) {
        this.executeSafe(() => {
            if (this.todoDatabase) {
                return this.todoDatabase.transaction((tx: any) => { callback(tx) }, (t: any, e: any) => this.transError(t, e), (t: any, r: any) => this.transSuccess(t, r));
            } else {
                alert('database does not supported in your browser or failed to initialized');
                throw 'database not supported';
            }
        });
    }

    private initDB() {
        const db_name = 'todo_db';
        const db_version = '0.1';
        const db_describe = 'To Do container db';
        const db_size = 2 * 2048;
        this.executeSafe(() => {
            this.todoDatabase = window.openDatabase(db_name, db_version, db_describe, db_size, (db) => {
                console.info(db);
                console.info("Database opened Successfully! Or created for the first time !");
            });
        });
    }

    private createTable() {
        this.getTransaction((tx:any) => {
            tx.executeSql(`CREATE TABLE IF NOT EXISTS ${this.tableName} (id int primary key , value text,done boolean)`, [], (t:any,r: any) => this.result(t,r), (t: any, e: any) => this.transError(t, e));
        });
    }

    private executeSafe(callback: any) {
        try {
            callback();
        } catch (e) {
            // add logs or notification service here.
            console.error(e);
        }
    }

    private result(transaction :any, result: any) {
        this.executeSafe(() => {
            console.log(transaction);
            return result;
        });
    }

    private transError(t: any, e: any) {
        console.log(t);
        console.log(e);
        console.error("Error occured ! Code:" + e.code + " Message : " + e.message);
    }

    transSuccess(t: any, r: any) {
        console.info("Transaction completed Successfully!");
        console.log(t);
        console.log(r);
    }
}
