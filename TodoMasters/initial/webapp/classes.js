import { observerMixin } from "./mixin";

class TodoItem {
    constructor(text) {
        this.text = text;
    }
    equals(other) {    // Value Object pattern
        return this.text == other.text;
    }
}

class TodoList {     // Singleton pattern
    // Data
    #data = new Set();
    get items() { return this.#data };

    // Singleton
    constructor() {
        if (TodoList.instance) {
            throw new Error("Use TodoList.getInstance() to access the list")
        }
    }    
    static instance = null;
    static {
        this.instance = new TodoList();
    }
    static getInstance(){
        return this.instance;
    }

    // List behavior
    add(item) {
        const array = Array.from(this.#data);
        const todoExists = array.filter(t=>t.equals(item)).length>0;
        if (!todoExists){
            this.#data.add(item);
            this.notify();
        }
    }
    delete(todo_text) {
        const array = Array.from(this.#data);
        // TODO: handle error cases
        const todoDelete = array.filter(t=>t.text == todo_text)[0];
        this.#data.delete(todoDelete);
    }
    find(todo_text) {
        const array = Array.from(this.#data);
        return array.find(t=>t.text==todo_text);
    }
    replaceList(list) {
        this.#data = list;
        this.notify();
    }
    
 }
 // Applying observer mixin to the class
 Object.assign(TodoList.prototype, observerMixin);

