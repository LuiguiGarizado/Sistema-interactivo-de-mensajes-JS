# Data Persistence

This project is a small task management app that demonstrates how to combine DOM interaction with local persistence and basic REST API operations.

## Main files
- `index4.html` - User interface for the task manager.
- `PersistenciaDeDatos.js` - Main application logic.
- `styles.css` - Visual styles for the interface.

## Implemented features
- Create new tasks using the form.
- Display the task list in the DOM.
- Mark tasks as completed and undo completed status.
- Delete tasks.
- Save and load tasks from `localStorage`.
- Sync data with the test JSONPlaceholder API.

## Data persistence
- `saveToLocalStorage()` saves the `tasks` array to `localStorage` under the `myTasks` key.
- `loadFromLocalStorage()` loads saved data and renders it on startup.
- After each change (create, update, delete), the app updates local storage.

## API interaction
- `apiFetchTasks()` retrieves items from the API and saves them to `localStorage`.
- `apiCreateTask(task)` sends a new task to the API and adds it to the local list.
- `apiUpdateTask(id, currentStatus)` simulates updating the task status.
- `apiDeleteTask(id, listItemElement)` removes the task from the list and local persistence.

## Usage
1. Open `index4.html` in the browser.
2. Add a task using the form.
3. Use the `Complete`, `Undo`, or `Delete` buttons to modify tasks.
4. Refresh the page to verify that tasks are preserved through `localStorage`.
