var notesWrapper = document.getElementById("notes-wrapper");
var title = document.getElementById("title");
var content = document.getElementById("content");
var error = document.getElementById("form-error");

let notesData = [];

// Function to create a new note element
var createNote = (uid, title, text, date) => {
  var note = document.createElement("div");
  note.className = "note";
  note.id = uid;
  note.innerHTML = `
    <div class="note-title">${title}</div>
    <div class="note-controls">
      <button class="note-edit" onclick="editNote(${uid})">
        Edit
      </button>
      <button class="note-save" style="display:none" onclick="saveNote(${uid})">
        Save
      </button>
      <button class="note-delete" onclick="deleteNote(${uid})">
        Delete
      </button>
    </div>
    <div class="note-text">${text}</div>
    <div class="note-date">${date}</div>
  `;

  notesWrapper.insertBefore(note, notesWrapper.firstChild);
};

// Function to add a new note
var addNote = () => {
  if (title.value.trim().length == 0 && content.value.trim().length == 0) {
    error.innerHTML = "Note cannot be empty";
    return;
  }

  var uid = new Date().getTime().toString();

  // Create a note object
  var noteObj = {
    uid: uid,
    title: title.value,
    text: content.value,
    date: new Date().toLocaleDateString()
  };
  
  // Add the note object to the notesData array
  notesData.push(noteObj);
  // Save the notesData array to local storage
  localStorage.setItem("notes", JSON.stringify(notesData));
  
  createNote(noteObj.uid, noteObj.title, noteObj.text, noteObj.date);

  error.innerText = "";
  content.value = "";
  title.value = "";
};

// Function to enable editing of a note
var editNote = (uid) => {
  var note = document.getElementById(uid);

  var noteTitle = note.querySelector(".note-title");
  var noteText = note.querySelector(".note-text");
  var noteSave = note.querySelector(".note-save");
  var noteEdit = note.querySelector(".note-edit");

  noteTitle.contentEditable = "true";
  noteText.contentEditable = "true";
  noteEdit.style.display = "none";
  noteSave.style.display = "block";
  noteText.focus();
};
// Function to save changes to a note
var saveNote = (uid) => {
  var note = document.getElementById(uid);

  var noteTitle = note.querySelector(".note-title");
  var noteText = note.querySelector(".note-text");
  var noteSave = note.querySelector(".note-save");
  var noteEdit = note.querySelector(".note-edit");

  if (
    noteTitle.innerText.trim().length == 0 &&
    noteText.value.trim().length == 0
  ) {
    error.innerHTML = "Note cannot be empty";
    return;
  }
  // Update notesData array with the changes
  notesData.forEach((note) => {
    if (note.uid == uid) {
      note.title = noteTitle.innerText;
      note.text = noteText.innerText;
    }
  });
   // Save the updated notesData array to local storage
  localStorage.setItem("notes", JSON.stringify(notesData));

  noteTitle.contentEditable = "false";
  noteText.contentEditable = "false";
  noteEdit.style.display = "block";
  noteSave.style.display = "none";
  error.innerText = "";
};
// Function to delete a note
var deleteNote = (uid) => {
  let confirmDelete = confirm("Are you sure you want to delete this note?");
  if (!confirmDelete) {
    return;
  }

  var note = document.getElementById(uid);
  note.parentNode.removeChild(note);
  notesData = notesData.filter((note) => {
    return note.uid != uid;
  });
  // Save the updated notesData array to local storage
  localStorage.setItem("notes", JSON.stringify(notesData));
};

window.addEventListener("load", () => {
  notesData = localStorage.getItem("notes")
    ? JSON.parse(localStorage.getItem("notes"))
    : [];
  notesData.forEach((note) => {
    createNote(note.uid, note.title, note.text, note.date);
  });
});