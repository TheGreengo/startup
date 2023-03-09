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
  dialog.className = "dialog-todo";
  dialog.innerText = "";

  //now to create the dialog
  // first a header
  const header = document.createElement('div');
  header.className = "todo-tl";
  header.innerText = "New To-Do";
  dialog.appendChild(header);
  // then a form?
  const form = document.createElement('div');
  form.className = "todo-form";
  form.innerText = "";

  // then a date selector
  const dateSec = document.createElement('div');
  dateSec.className = "todo-dialog-sec";
  const dateLabel = document.createElement('label');
  const dateInput = document.createElement('input');

  dateInput.type = "date";
  dateInput.id = "dateInput";
  dateLabel.innerText = "Select a due date for your task: ";

  dateSec.appendChild(dateLabel);
  dateSec.appendChild(dateInput);
  form.appendChild(dateSec);
  // then a title input
  const titleSec = document.createElement('div');
  titleSec.className = "todo-dialog-sec";
  const titleLabel = document.createElement('label');
  const titleInput = document.createElement('input');
  titleInput.id = "titleInput";

  titleInput.type = "text";
  titleLabel.innerText = "Enter a description for your task: ";

  titleSec.appendChild(titleLabel);
  titleSec.appendChild(titleInput);
  form.appendChild(titleSec);
  // then a type input
  const typeSec = document.createElement('div');
  typeSec.className = "todo-dialog-sec";
  const typeLabel = document.createElement('label');
  const typeInput = document.createElement('input');
  typeInput.id = "typeInput";

  typeInput.type = "text";
  typeLabel.innerText = "Enter a type for your task: ";

  typeSec.appendChild(typeLabel);
  typeSec.appendChild(typeInput);
  form.appendChild(typeSec);
  // then a cancel and submit button

  const butSec = document.createElement('div');
  butSec.className = "todo-dialog-sec";
  butSec.innerHTML = '<button class="cancel-button" onclick="cancelTask()">Cancel</button> <button class="create-button" onclick="newTodo()">Create</button>';
  form.appendChild(butSec);

  dialog.appendChild(form);

  holder.appendChild(dialog);
}

function newTodo() {

  const type = document.querySelector('#typeInput');
  const date = document.querySelector('#dateInput');
  const desc = document.querySelector('#titleInput');
  console.log(type.value);
  console.log(date.value);
  console.log(desc.value);
  todoDB.push({
    description: desc.value,
    dueDate: new Date(date.value),
    type: type.value,
    id: currId
  });
  currId++;
  const holder = document.querySelector('.overlay');
  holder.style.display = "none";
  createTodos();
}

function cancelTask() {
  const holder = document.querySelector('.overlay');
  holder.style.display = "none";
}

function deleteButton(id) {
  todoDB = todoDB.filter((entry) => entry.id !== id);
  createTodos();
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