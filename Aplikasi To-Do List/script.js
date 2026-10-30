const storageKey = "todo-list-tasks";
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const emptyState = document.getElementById("empty-state");
const statusMessage = document.getElementById("status-message");

function loadTasks() {
    const savedTasks = localStorage.getItem(storageKey);

    if (!savedTasks) {
        return [];
    }

    try {
        const tasks = JSON.parse(savedTasks);
        if (
            !Array.isArray(tasks)
            || !tasks.every((task) => (
                typeof task.text === "string"
                && typeof task.completed === "boolean"
            ))
        ) {
            throw new Error("Format data tugas tidak valid.");
        }
        return tasks;
    } catch (error) {
        console.error("Gagal memuat tugas dari localStorage:", error);
        statusMessage.textContent = "Data tugas tersimpan tidak dapat dibaca.";
        return [];
    }
}

let tasks = loadTasks();

function saveTasks() {
    try {
        localStorage.setItem(storageKey, JSON.stringify(tasks));
        statusMessage.textContent = "";
    } catch (error) {
        console.error("Gagal menyimpan tugas ke localStorage:", error);
        statusMessage.textContent = "Tugas berubah, tetapi gagal disimpan di browser.";
    }
}

function renderTasks() {
    taskList.replaceChildren();
    emptyState.hidden = tasks.length > 0;

    tasks.forEach((task, index) => {
        const item = document.createElement("li");
        item.className = "task-item";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.setAttribute("aria-label", `Tandai "${task.text}" selesai`);
        checkbox.addEventListener("change", () => {
            tasks[index].completed = checkbox.checked;
            saveTasks();
            renderTasks();
        });

        const text = document.createElement("span");
        text.className = task.completed ? "task-text completed" : "task-text";
        text.textContent = task.text;

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Hapus";
        deleteButton.setAttribute("aria-label", `Hapus tugas "${task.text}"`);
        deleteButton.addEventListener("click", () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        item.append(checkbox, text, deleteButton);
        taskList.append(item);
    });
}

taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = taskInput.value.trim();

    if (!text) {
        taskInput.focus();
        return;
    }

    tasks.push({ text, completed: false });
    saveTasks();
    renderTasks();
    taskInput.value = "";
    taskInput.focus();
});

renderTasks();
