let notesDB = [
  {
    title: "Example Note",
    tag: "Type 1",
    date: new Date("3-14-2023"),
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut" +
    " enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in" + 
    " reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt " +
    "in culpa qui officia deserunt mollit anim id est laborum.",
    id: 1
  }
];

let currId = 2;
let iteration = 0;

function createNotes() {
  const holder = document.querySelector('#display');
  holder.innerHTML = "";

  if (notesDB.length === 0) {
    holder.innerHTML = '<h3>No notes to display</h3>';
  }

  for (let i = 0; i < notesDB.length; i++) {
    const newNote = document.createElement('div');
    const head = document.createElement('div');
    head.className = "note-head";
    const title = document.createElement('div');
    title.innerText = `Title: ${notesDB[i].title}`;
    const tag = document.createElement('div');
    tag.innerText = `Tag: ${notesDB[i].tag}`;
    const date = document.createElement('div');
    console.log(notesDB[i].date);
    date.innerText = `Date: ${notesDB[i].date.getMonth()+1}-${notesDB[i].date.getDate()}-${notesDB[i].date.getFullYear() - 2000}`;

    head.appendChild(title);
    head.appendChild(tag);
    head.appendChild(date);

    const delBtn = document.createElement('button');
    delBtn.textContent = `Delete`;
    delBtn.className = "note-btn";
    delBtn.onclick = function() {
      notesDB = notesDB.filter((entry) => entry.id !== notesDB[i].id);
      createNotes();
    };
    head.appendChild(delBtn);

    newNote.appendChild(head);

    const bod = document.createElement('div');
    bod.className = "note-body";
    bod.innerText = notesDB[i].desc;
    newNote.appendChild(bod);

    holder.appendChild(newNote);
  }
}

function getDialog() {
  const holder = document.querySelector('.overlay');

  holder.style.display = "block";

  const dialog = document.createElement('div');
  dialog.className = "dialog-notes";
  dialog.innerText = "";

  //now to create the dialog
  // first a header
  const header = document.createElement('div');
  header.className = "notes-tl";
  header.innerText = "New Note";
  dialog.appendChild(header);
  // then a form?
  const form = document.createElement('div');
  form.className = "notes-form";
  form.innerText = "";
  form.addEventListener("submit",() => newNote());

  // then a date selector
  const titleSec = document.createElement('div');
  titleSec.className = "notes-dialog-sec";
  const titleLabel = document.createElement('label');
  const titleInput = document.createElement('input');
  titleInput.id = `titleInput${iteration}`;

  titleInput.type = "text";
  titleLabel.innerText = "Enter a title for your note: ";
  console.log(titleInput.value);

  titleSec.appendChild(titleLabel);
  titleSec.appendChild(titleInput);
  form.appendChild(titleSec);

  const dateSec = document.createElement('div');
  dateSec.className = "notes-dialog-sec";
  const dateLabel = document.createElement('label');
  const dateInput = document.createElement('input');

  dateInput.type = "date";
  dateInput.id = `dateInput${iteration}`;
  dateLabel.innerText = "Select a due date for your note: ";

  dateSec.appendChild(dateLabel);
  dateSec.appendChild(dateInput);
  form.appendChild(dateSec);
  // then a title input
  const typeSec = document.createElement('div');
  typeSec.className = "notes-dialog-sec";
  const typeLabel = document.createElement('label');
  const typeInput = document.createElement('input');
  typeInput.id = `typeInput${iteration}`;

  typeInput.type = "text";
  typeLabel.innerText = "Enter a tag for your note: ";

  typeSec.appendChild(typeLabel);
  typeSec.appendChild(typeInput);
  form.appendChild(typeSec);

  const bodSec = document.createElement('div');
  bodSec.className = "notes-dialog-sec";
  const bodLabel = document.createElement('label');
  const bodBreak= document.createElement('br');

  const bodInput = document.createElement('textarea');
  bodInput.id = `bodInput${iteration}`;

  bodLabel.innerText = "Enter the body of your note: ";

  bodSec.appendChild(bodLabel);
  bodSec.appendChild(bodBreak);
  bodSec.appendChild(bodInput);
  form.appendChild(bodSec);
  
  // then a cancel and submit button

  const butSec = document.createElement('div');
  butSec.className = "notes-dialog-sec";
  butSec.innerHTML = '<button class="cancel-button" onclick="cancelNote()">Cancel</button> <button class="create-button" onclick="newNote()">Create</button>';
  form.appendChild(butSec);

  dialog.appendChild(form);

  holder.appendChild(dialog);
}

function newNote() {
  let type = document.querySelector(`#typeInput${iteration}`);
  let date = document.querySelector(`#dateInput${iteration}`);
  let title = document.querySelector(`#titleInput${iteration}`);
  let bod = document.querySelector(`#bodInput${iteration}`);
  console.log(title.value);
  console.log(type.value);
  console.log(date.value);
  console.log(bod.value);
  console.log(currId);
  notesDB.push({
    title: title.value,
    tag: type.value,
    date: new Date(date.value),
    desc: bod.value,
    id: currId
  });
  currId++;
  iteration++;
  title.value = "";
  bod.value = "";
  const holder = document.querySelector('.overlay');
  holder.style.display = "none";
  createNotes();
}

function cancelNote() {
  const holder = document.querySelector('.overlay');
  holder.style.display = "none";
}

createNotes();

/*
Notes:
 - add note (on click button) [dialog]
 - database (list of notes)
 - notes type
   - title (string)
   - body (string)
   - types (string array)
   - date last edited
 - edit notes (on click edit button)
 - add delete button
 - create filter option (called once button selected)
 - get search working
 */