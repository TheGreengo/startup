let todoDB = [
  {
    description: "Example Task",
    dueDate: new Date("3-14-2023"),
    type: "Type 1",
    id: 1
  },
];

let currId = 4;

function createTodos() {
  const holder = document.querySelector('#display');
  holder.innerHTML = "";

  if (todoDB.length === 0) {
    holder.innerHTML = '<h3>No tasks to display</h3>';
  }

  for (let i = 0; i < todoDB.length; i++) {
    const newTask = document.createElement('div');
    newTask.className = "task";

    const compBtn = document.createElement('button');
    compBtn.textContent = `${String.fromCodePoint(10004)}`;
    compBtn.className = "comp-btn";
    compBtn.onclick = function() {
      todoDB = todoDB.filter((entry) => entry.id !== todoDB[i].id);
      createTodos();
    };
    newTask.appendChild(compBtn);

    const editBtn = document.createElement('button');
    editBtn.textContent = "Edit";
    editBtn.className = "edit-btn";
    newTask.appendChild(editBtn);

    const taskMN = document.createElement('div');
    taskMN.className = "task-mn";

    const desc = document.createElement('div');
    desc.innerText = `Description: ${todoDB[i].description}`;

    const typ = document.createElement('div');
    typ.innerText = `Type: ${todoDB[i].type}`;

    const dt = document.createElement('div');
    dt.innerText = `Date: ${todoDB[i].dueDate.getMonth()+1}-${todoDB[i].dueDate.getDate()}-${todoDB[i].dueDate.getFullYear() - 2000}`;

    taskMN.appendChild(desc);
    taskMN.appendChild(typ);
    taskMN.appendChild(dt);
    newTask.appendChild(taskMN);

    const delBtn = document.createElement('button');
    delBtn.textContent = `${String.fromCodePoint(10006)}`;
    delBtn.className = "dlt-btn";
    delBtn.onclick = function() {
      todoDB = todoDB.filter((entry) => entry.id !== todoDB[i].id);
      createTodos();
    };
    newTask.appendChild(delBtn);

    holder.appendChild(newTask);
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
/*
Todo:
 - add note (on button click) [dialog]
 - delete note (on button click)
 - edit note (on button click) [dialog]
 - todo database (list of todos)
 - todo type 
   - Description (string)
   - Due Date (date)
   - Type (string array)
 - filter (on select)
 - search (on keystroke)
 - fix sort options
 - sort
*/
createTodos();