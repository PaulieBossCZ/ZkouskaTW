
const STORAGE_KEY = 'ukolovnik-storage';

new Vue({
    el: ".todoapp",
    data() {
        return {
            newTodo: "",
            editedTodo: null,
            editedTodoText: null,
            itemsLeft: null,
            allButton: "selected",
            activeButton: null,
            completedButton: null,
            todos: []
        }
        
    },
    //nacteni ukolu z local storage
    created() {
        this.todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        
    },
    methods: {
        //pridani ukolu
        addTodo() {
            if (this.newTodo != "") {
                this.todos.push({ id: this.todos.length, todoCompletionToggleButtonState: "", todoCompletionState: "incomplete", text: this.newTodo });
                localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos));
                this.newTodo = "";
                this.itemsLeft = this.todos.length;
            } else {
                alert("Zadejte text úkolu!");
            }
        },

        //vymazani ukolu
        removeTodo(todo) {
            this.todos.splice(this.todos.indexOf(todo), 1);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos));
            this.itemsLeft = this.todos.length;
        },

        //upravovani ukolu
        editTodo(todo) {
            if (todo.todoCompletionState == "completed") {
                alert("Úkol už byl dokončen!")
            } else {
                this.editedTodo = todo;
                this.editedTodoText = todo.text;
            }
        },

        //update ukolu
        updateTodo(todo) {
            if (!this.editedTodo) {
                return;
            }

            this.editedTodo = null;
            todo.text = this.editedTodoText.trim();
            if (!todo.text) {
                this.removeTodo(todo);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos));
            }
        },

        
        toggleTodoCompletionState(todo) {
            if (todo.todoCompletionToggleButtonState === "" || todo.todoCompletionToggleButtonState === false) {
                todo.todoCompletionToggleButtonState = "checked";
                todo.todoCompletionState = "completed";
            } else if (todo.todoCompletionToggleButtonState === "checked" || todo.todoCompletionToggleButtonState === true) {
                todo.todoCompletionToggleButtonState = "";
                todo.todoCompletionState = "incomplete";
            }

            
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos));
        },

        toggleTodoCompletionState1(todo) {

            if (todo.todoCompletionToggle1ButtonState === "" || todo.todoCompletionToggle1ButtonState === false) {
                todo.todoCompletionToggle1ButtonState = "checked";
                todo.todoCompletionState = "uncomplete";
            } else if (todo.todoCompletionToggle1ButtonState === "checked" || todo.todoCompletionToggle1ButtonState === true) {
                todo.todoCompletionToggle1ButtonState = "";
                todo.todoCompletionState = "incomplete";
            }
            
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos));
        },

        //zobrazi nesplnene ukoly
        showActive() {
            this.todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

            if (this.todos.filter(function(item) { return item.todoCompletionState.includes("incomplete") }).length) {
                this.todos = this.todos.filter(function(item) {
                    return item.todoCompletionState.includes("incomplete");
                });

                this.allButton = null;
                this.activeButton = "selected";
                this.completedButton = null;

            } else {
                alert("Žádné nekodončené úkoly");
            }
        },

        //zobrazi vsechny ukoly
        showAll() {
            this.todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

            this.allButton = "selected";
            this.activeButton = null;
            this.completedButton = null;
        }
    }
});