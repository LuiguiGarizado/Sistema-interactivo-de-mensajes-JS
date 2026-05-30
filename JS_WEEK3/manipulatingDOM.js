// --- DOM Elements & State ---
const noteInput = document.getElementById('noteInput');
const addBtn    = document.getElementById('addBtn');
const notesList = document.querySelector('#notesList'); 

// Array to hold the text of all notes in memory
let notes = [];

// --- Functions ---

// Saves the current notes array permanently to the browser's storage
function saveToLocalStorage(){
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Creates the HTML elements for a single note and displays it on the screen
function renderNoteInDOM(noteText, index){
    const li = document.createElement('li');
    li.textContent = noteText + ""; 

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';

    // Handle note deletion
    deleteBtn.addEventListener('click', function(){
        notes.splice(index, 1);    // Remove from memory array

        saveToLocalStorage();      // Update permanent storage

        notesList.removeChild(li); // Remove from screen
        
        console.log(`Note deleted, Index : ${index}. Remaining notes: ${notes.length}`);
    });

    li.appendChild(deleteBtn);
    notesList.appendChild(li);
}

// Loads previously saved notes from storage when the page opens
function loadInitialNotes(){
    const savedNotes = localStorage.getItem('notes');

    if(savedNotes){
        notes = JSON.parse(savedNotes);
        console.log(`Successfully loaded ${notes.length} notes from Local Storage.`);
        
        notes.forEach((note, index) => {
            renderNoteInDOM(note, index);
        });
    } else {
        console.log('No previous notes found in Local Storage. Starting fresh.');
    }
}

// --- Event Listeners & Initialization ---

// Handle adding a new note when clicking the button
addBtn.addEventListener('click', function() {
    const text = noteInput.value.trim();

    // Prevent adding blank notes
    if(text === ""){
        alert("Please write something before adding a note");
        return;
    }
    
    notes.push(text);
    saveToLocalStorage();

    // Render the new note using its position in the array as the index
    const newIndex = notes.length - 1 ;
    renderNoteInDOM(text, newIndex);
    console.log(`Note added successfully: ${text}`);

    // Clear input field and return focus to it for quick typing
    noteInput.value = "";
    noteInput.focus();
}); 

// Run immediately to load any saved notes when the page starts
loadInitialNotes();



