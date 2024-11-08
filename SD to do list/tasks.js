document.addEventListener("DOMContentLoaded", () => {
    // Слушатель на отправку формы задач
    const taskForm = document.getElementById('taskForm');
    if (taskForm) {
        taskForm.addEventListener('submit', addTask);
    }

    // Проверка логина
    checkLogin();

    // Инициализация пользователя
    const username = localStorage.getItem('loggedInUser');
    if (username) {
        document.getElementById('userName').textContent = `Welcome, ${username}`;
        document.getElementById('loginLink').style.display = 'none';
        document.getElementById('registerLink').style.display = 'none';
        document.getElementById('exitLink').style.display = 'block';

        // Загрузка задач
        const tasks = loadTasksForUser(username);
        renderTasks(tasks);
    } else {
        alert("Please log in to access your tasks.");
        window.location.href = "index.html";
    }
});

// Функция для проверки логина
function checkLogin() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        alert("You must be logged in to view this page.");
        window.location.href = "index.html";
    }
}


// Функция для сохранения задач в localStorage для текущего пользователя
function saveTasksForUser(username, tasks) {
    localStorage.setItem(`tasks_${username}`, JSON.stringify(tasks));
}

// Функция для загрузки задач для текущего пользователя
function loadTasksForUser(username) {
    const tasks = JSON.parse(localStorage.getItem(`tasks_${username}`)) || [];
    return tasks;
}

// Функция для отображения задач
function renderTasks(tasks) {
    const taskAccordion = document.getElementById('taskAccordion');
    taskAccordion.innerHTML = ''; // очищаем список задач

    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('accordion-item');
        taskElement.innerHTML = `
            <h2 class="accordion-header" id="heading-${task.id}">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${task.id}" aria-expanded="true" aria-controls="collapse-${task.id}">
                    ${task.name} - ${task.dueDate}
                </button>
            </h2>
            <div id="collapse-${task.id}" class="accordion-collapse collapse show" aria-labelledby="heading-${task.id}" data-bs-parent="#taskAccordion">
                <div class="accordion-body">
                    <strong>Description:</strong> ${task.description}
                </div>
            </div>
        `;
        taskAccordion.appendChild(taskElement);
    });
}

// Функция для добавления новой задачи
function addTask(event) {
    event.preventDefault();

    const taskName = document.getElementById('taskName').value;
    const taskDescription = document.getElementById('taskDescription').value;
    const taskDueDate = document.getElementById('taskDueDate').value;

    const newTask = {
        id: Date.now(),
        name: taskName,
        description: taskDescription,
        dueDate: taskDueDate
    };

    const username = localStorage.getItem('loggedInUser');
    const tasks = loadTasksForUser(username);
    tasks.push(newTask);

    saveTasksForUser(username, tasks);
    renderTasks(tasks);

    closeModal();
}

// Функция для открытия модального окна
function showModal() {
    const modal = document.getElementById('customTaskModal');
    modal.style.display = 'block';
}

// Функция для закрытия модального окна
function closeModal() {
    const modal = document.getElementById('customTaskModal');
    modal.style.display = 'none';
}

// Функция для выхода пользователя
function logoutUser() {
    localStorage.removeItem('loggedInUser');
    window.location.href = "index.html";
}

// Функция для проверки статуса входа
function checkLogin() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        alert("You must be logged in to view this page.");
        window.location.href = "index.html";
    }
}
