const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('add-button');
const taskList = document.getElementById('task-list');

document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
});

addButton.addEventListener('click', function() {
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const listItem = createTaskElement(taskText);
        taskList.appendChild(listItem);

        saveTasks();

        taskInput.value = '';
    }
});

taskList.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-button')) {
        const listItem = event.target.parentNode;
        taskList.removeChild(listItem);

        saveTasks();
    }
});

function saveTasks() {
    const tasks = [];
    const taskItems = taskList.children;

    for (let i = 0; i < taskItems.length; i++) {
        const taskText = taskItems[i].querySelector('.task-text').textContent;
        tasks.push(taskText);
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');

    if (storedTasks) {
        const tasks = JSON.parse(storedTasks);

        for (let i = 0; i < tasks.length; i++) {
            const listItem = createTaskElement(tasks[i]);
            taskList.appendChild(listItem);
        }
    }
}

function createTaskElement(taskText) {
    const listItem = document.createElement('li');

    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;
    taskSpan.classList.add('task-text');

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    listItem.appendChild(taskSpan);
    listItem.appendChild(deleteButton);

    return listItem;
}