document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("task-input");
    const addTaskBtn = document.getElementById("add-task");
    const taskList = document.getElementById("task-list");
    const themeToggleBtn = document.getElementById("theme-toggle");

    // Load tasks from local storage
    loadTasks();

    // Add Task
    addTaskBtn.addEventListener("click", function () {
        if (taskInput.value.trim() !== "") {
            addTask(taskInput.value.trim());
            taskInput.value = "";
            saveTasks();
        }
    });

    // Add Task on "Enter" Key Press
    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter" && taskInput.value.trim() !== "") {
            addTask(taskInput.value.trim());
            taskInput.value = "";
            saveTasks();
        }
    });

    // Add Task to List
    function addTask(taskText) {
        const li = document.createElement("li");

        // Task Text
        const span = document.createElement("span");
        span.textContent = taskText;
        span.addEventListener("click", function () {
            this.classList.toggle("completed");
            saveTasks();
        });

        // Delete Button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", function () {
            li.remove();
            saveTasks();
        });

        // Append Elements
        li.appendChild(span);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    }

    // Save Tasks to Local Storage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll("#task-list li span").forEach((span) => {
            tasks.push({ text: span.textContent, completed: span.classList.contains("completed") });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Load Tasks from Local Storage
    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        savedTasks.forEach((task) => {
            addTask(task.text);
            if (task.completed) {
                document.querySelector("#task-list li:last-child span").classList.add("completed");
            }
        });
    }

    // Theme Toggle
    themeToggleBtn.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        themeToggleBtn.textContent = document.body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
    });
});
