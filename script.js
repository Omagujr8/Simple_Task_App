let tasks = [];

// Load tasks safely from localStorage
try {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
} catch (e) {
    tasks = [];
}

// Save helper function (single source of truth)
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add task
function addTask() {
    const input = document.getElementById("taskInput");
    const task = input.value.trim();

    if (task === "") return;

    // Prevent duplicates (case-insensitive optional improvement)
    if (tasks.some(t => t.text.toLowerCase() === task.toLowerCase())) {
        alert("Task already exists!");
        return;
    }

    tasks.push({
        text: task,
        completed: false
    });

    input.value = "";
    input.focus();

    saveTasks();
    renderTasks();
}

// Delete task
function deleteTask(index) {
    if (confirm("Delete this task?")) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }
}

// Toggle completed state
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// Edit task
function editTask(index) {
    const newTask = prompt("Edit task:", tasks[index].text);

    if (newTask && newTask.trim() !== "") {
        tasks[index].text = newTask.trim();
        saveTasks();
        renderTasks();
    }
}

// Render tasks to UI
function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span 
                onclick="toggleTask(${index})"
                style="
                    cursor: pointer;
                    text-decoration: ${task.completed ? "line-through" : "none"};
                "
            >
                ${task.text}
            </span>

            <button onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;

        list.appendChild(li);
    });
}

// Enter key support
document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("taskInput");

    input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            addTask();
        }
    });

    renderTasks();
});