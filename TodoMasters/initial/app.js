globalThis.DOM = {}
const DOMN = globalThis.DOM

document.addEventListener("DOMContentLoaded", () => {
    DOM.todoList = document.getElementById("todo-list");
    DOM.addBtn = document.getElementById("add-btn");
    DOM.todoInput = document.getElementById("todo-input");

    DOM.addEventListener("click", event => {
        // TODO
    });

    DOM.addEventListener("click", event => {
        if (event.target.classList.contains("delete-brn")) {
            // TODO
        }
    });
})