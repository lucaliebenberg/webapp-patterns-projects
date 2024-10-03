import { TodoList } from "../final/webapp/classes";
import { CommandExecutor, Commands, Command } from "./webapp/command.js";
import { LocalStorage } from "./webapp/storage.js";

globalThis.DOM = {}
const DOM = globalThis.DOM

function renderList() {
    DOM.todoList.innerHTML = "";
    const list = TodoList.getInstance();
    for (let todo of list.items) {
        const listItem = document.createElement("li");
        listItem.classList.add("todo-item");
        listItem.innerHTML = `
            ${todo.text} <button class='delete-btn'>Delete</button>
        `;
        listItem.dataset.text = todo.text;
        DOM.todoList.appendChild(listItem);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    DOM.todoList = document.getElementById("todo-list");
    DOM.addBtn = document.getElementById("add-btn");
    DOM.todoInput = document.getElementById("todo-input");

    DOM.addEventListener("click", event => {
        const cmd = new Command(Commands.ADD)
        CommandExecutor.execute(cmd)
    });

    DOM.addEventListener("click", event => {
        if (event.target.classList.contains("delete-btn")) {
            const todo = event.target.parentNode.dataset.text;
            const cmd = new Command(Commands.DELETE, [todo]);
            CommandExecutor.execute(cmd);
        }
    });

    TodoList.getInstance().addObserver(renderList);

    document.addEventListener("DOMContentLoaded", () => {
        LocalStorage.load();
    });

    document.addEventListener("keydown", event => {
        if (event.ctrlKey && event.key === 'p') {
            event.preventDefault();
            const cmd = new Command(Commands.ADD);
            CommandExecutor.execute(cmd);
        }
        if (event.ctrlKey && event.key === 'z') {
            event.preventDefault();
            const cmd = new Command(Commands.UNDO);
            CommandExecutor.execute(cmd);
        }
    });
})