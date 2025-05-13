const form = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const emptyMessage = document.getElementById("empty-message");

// افزودن کار جدید
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    if (text !== "") {
        const newTask = createTaskElement(text);
        taskList.appendChild(newTask);
        taskInput.value = "";
        updateEmptyMessage();
        saveTasks();
    }
});

// ساختن یک عنصر task
function createTaskElement(text) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = text;
    li.appendChild(span);

    // تیک زدن برای انجام‌شدن
    span.addEventListener("click", () => {
        li.classList.toggle("done");
        saveTasks();
    });

    // دکمه حذف
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "حذف";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => {
        li.remove();
        updateEmptyMessage();
        saveTasks();
    });

    li.appendChild(deleteBtn);
    return li;
}

// ذخیره در localStorage
function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll("li").forEach(li => {
        tasks.push({
            text: li.querySelector("span").textContent,
            done: li.classList.contains("done")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// بارگذاری از localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        const taskEl = createTaskElement(task.text);
        if (task.done) {
            taskEl.classList.add("done");
        }
        taskList.appendChild(taskEl);
    });
    updateEmptyMessage();
}

// پیام خالی بودن لیست
function updateEmptyMessage() {
    const isEmpty = taskList.children.length === 0;
    emptyMessage.classList.toggle("visible", isEmpty);
}

// بارگذاری اولیه
loadTasks();
