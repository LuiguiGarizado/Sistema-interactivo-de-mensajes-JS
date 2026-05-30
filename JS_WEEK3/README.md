# DOM Manipulation and Local Storage

This project demonstrates how to create, store, and delete user notes using DOM manipulation and browser local storage.

## Main files
- `index3.html` - User interface for note management.
- `manipulatingDOM.js` - Main JavaScript logic that handles note creation, rendering, deletion, and persistence.
- `style.css` - Styles for the notes interface.

## Implemented features
- Add new notes from an input field.
- Render each note dynamically in the DOM.
- Remove notes with a delete button.
- Save notes in `localStorage` so they persist across page refreshes.
- Load saved notes automatically when the page opens.

## JavaScript behavior in `manipulatingDOM.js`
- `saveToLocalStorage()` stores the `notes` array in browser local storage.
- `loadInitialNotes()` loads saved notes and renders them at startup.
- `renderNoteInDOM(noteText, index)` creates list items and delete buttons for each note.
- Event listeners allow adding notes and deleting them from both the DOM and storage.

## Usage
1. Open `index3.html` in the browser.
2. Type a note and click the add button.
3. Use the delete buttons to remove notes.
4. Refresh the page to confirm that notes remain saved.
