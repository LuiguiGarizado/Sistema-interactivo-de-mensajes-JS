
// Global array to store data in memory
let tasks = [];

// Public testing API URL (JSONPlaceholder)
const API_URL = 'https://jsonplaceholder.typicode.com/todos';

// DOM Element References
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const syncBtn = document.getElementById('sync-btn');
const messageContainer = document.getElementById('message-container');


// Function to display dynamic messages in the DOM
function showMessage(text, isError = false) {
    messageContainer.innerHTML = `<p class="${isError ? 'error' : 'success'}">${text}</p>`;
    // Message disappears after 3 seconds
    setTimeout(() => { messageContainer.innerHTML = ''; }, 3000);
}

// Event listener for form submission
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevents page reload
    
    const taskTitle = taskInput.value.trim();

    // Validation to prevent empty data
    if (taskTitle === '') {
        showMessage('Please write a valid task.', true);
        return;
    }

    // Create the new task object
    const newTask = {
        title: taskTitle,
        completed: false
    };

    // Attempt to save to the API and locally
    await apiCreateTask(newTask);
    
    // Reset the form input fields
    taskForm.reset();
});



// Function to render the global 'tasks' array to the DOM
function renderTasks() {
    // Clear current list to prevent duplication
    taskList.innerHTML = '';

    tasks.forEach(task => {
        // Dynamically create <li> element
        const li = document.createElement('li');
        li.textContent = task.title;
        if (task.completed) li.style.textDecoration = 'line-through';

        // Toggle Complete Button (to simulate PUT)
        const completeBtn = document.createElement('button');
        completeBtn.textContent = task.completed ? 'Undo' : 'Complete';
        completeBtn.style.marginRight = '5px';
        completeBtn.addEventListener('click', () => apiUpdateTask(task.id, !task.completed));

        // Delete Button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.style.backgroundColor = '#dc3545';
        deleteBtn.style.color = 'white';
        deleteBtn.style.border = 'none';
        
        // Event listener to delete element on click
        deleteBtn.addEventListener('click', () => apiDeleteTask(task.id, li));

        // Attach buttons to a container div
        const btnContainer = document.createElement('div');
        btnContainer.appendChild(completeBtn);
        btnContainer.appendChild(deleteBtn);
        li.appendChild(btnContainer);

        // Use appendChild to add the li to the <ul> list
        taskList.appendChild(li);
    });
}


// LOCAL STORAGE PERSISTENCE

function saveToLocalStorage() {
    localStorage.setItem('myTasks', JSON.stringify(tasks));
    console.log(' Current Local Storage Content:', localStorage.getItem('myTasks'));
}

function loadFromLocalStorage() {
    const storedTasks = localStorage.getItem('myTasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTasks();
    }
}


// TASK 5: FETCH API INTEGRATION (ASYNC / AWAIT)

// GET: Fetch list of elements from the server
async function apiFetchTasks() {
    try {
        const response = await fetch(`${API_URL}?_limit=4`);
        if (!response.ok) throw new Error('Failed to connect to the server');
        
        const data = await response.json();
        console.log(' GET Server Response:', data);
        
        tasks = data;
        saveToLocalStorage();
        renderTasks();
        showMessage('Data synchronized from API.');

    } catch (error) {
        console.error('Error in GET request:', error);
        showMessage('Could not fetch API data, falling back to LocalStorage.', true);
    }
}

// POST: Add new element
async function apiCreateTask(task) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify(task),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        });
        
        if (!response.ok) throw new Error('Failed to create task');
        const createdTask = await response.json();
        
        // Testing APIs return the same ID (e.g., 201). 
        // We override it with a timestamp ID so local tracking works smoothly.
        createdTask.id = Date.now(); 
        
        console.log(' POST Server Response:', createdTask);

        // Update local state and persistence
        tasks.push(createdTask);
        saveToLocalStorage();
        renderTasks();
        showMessage('Task added successfully!');
    } catch (error) {
        console.error('Error in POST request:', error);
        showMessage('Error saving task to the server.', true);
    }
}

// PUT: Update item status
async function apiUpdateTask(id, currentStatus) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ completed: currentStatus }),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        });

        // Update locally regardless of API simulation limits
        tasks = tasks.map(t => t.id === id ? { ...t, completed: currentStatus } : t);
        saveToLocalStorage();
        renderTasks();
        showMessage('Task updated.');
    } catch (error) {
        console.error('Error in PUT request:', error);
    }
}

// DELETE: Remove item from API and DOM
async function apiDeleteTask(id, listItemElement) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Could not delete from server');
        console.log(` DELETE Server Response for ID ${id}: Status Code ${response.status}`);

        // Remove from global array state
        tasks = tasks.filter(t => t.id !== id);
        saveToLocalStorage();

        // Use removeChild to modify the DOM dynamically
        taskList.removeChild(listItemElement);
        
        showMessage('Task deleted successfully.');
    } catch (error) {
        console.error('Error in DELETE request:', error);
        showMessage('Could not delete task.', true);
    }
}



// Attach event listener to manual synchronization button
syncBtn.addEventListener('click', apiFetchTasks);

// When page reloads: Load from LocalStorage first; if empty, fetch from API.
window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('myTasks')) {
        loadFromLocalStorage();
        console.log(' Data automatically loaded from Local Storage');
    } else {
        apiFetchTasks();
    }
});