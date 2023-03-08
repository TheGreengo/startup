let todoDB = [
  {
    description: "Task 1",
    dueDate: new Date("3-14-2023"),
    type: ["important","personal"]
  },
  {
    description: "Task 2",
    dueDate: new Date("3-15-2023"),
    type: ["important","dull"]
  },
  {
    description: "Task 3",
    dueDate: new Date("3-16-2023"),
    type: ["dull","personal"]
  }
];

types = ["important","personal","dull"];

function createTodos() {
  const holder = document.querySelector('#display');
  holder.inneHTML = "";

  for (let i = 0; i < todoDB.length; i++) {
    const newTask = document.createElement('div');
    newTask.className = "task";

    const compBtn = document.createElement('button');
    compBtn.textContent = `${String.fromCodePoint(10004)}`;
    compBtn.className = "comp-btn";
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
    let thing = "";
    for (let j = 0; j < todoDB[i].type.length; j++) {
      thing += todoDB[i].type[j];
      if (j < todoDB[i].type.length - 1) {
        thing += ", ";
      }
    }
    typ.innerText = `Type: ${thing}`;

    const dt = document.createElement('div');
    dt.innerText = `Date: ${todoDB[i].dueDate.getMonth()+1}-${todoDB[i].dueDate.getDate()}-${todoDB[i].dueDate.getFullYear() - 2000}`;

    taskMN.appendChild(desc);
    taskMN.appendChild(typ);
    taskMN.appendChild(dt);
    newTask.appendChild(taskMN);

    const delBtn = document.createElement('button');
    delBtn.textContent = `${String.fromCodePoint(10006)}`;
    delBtn.className = "dlt-btn";
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
  const form = document.createElement('form');
  form.className = "todo-form";
  form.innerText = "";

  // then a date selector
  const dateSec = document.createElement('div');
  dateSec.className = "todo-dialog-sec";
  const dateLabel = document.createElement('label');
  const dateInput = document.createElement('input');

  dateInput.type = "date";
  dateLabel.innerText = "Select a due date for your task: ";

  dateSec.appendChild(dateLabel);
  dateSec.appendChild(dateInput);
  form.appendChild(dateSec);
  // then a title input
  const titleSec = document.createElement('div');
  titleSec.className = "todo-dialog-sec";
  const titleLabel = document.createElement('label');
  const titleInput = document.createElement('input');

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

  typeInput.type = "text";
  typeLabel.innerText = "Enter a type for your task: ";

  typeSec.appendChild(typeLabel);
  typeSec.appendChild(typeInput);
  form.appendChild(typeSec);
  // then a cancel and submit button

  const butSec = document.createElement('div');
  butSec.className = "todo-dialog-sec";
  const cancelBtn = document.createElement('button');
  const submitBtn = document.createElement('button');

  cancelBtn.innerText = "Cancel";
  cancelBtn.onclick = "cancelTask()";
  cancelBtn.className = "cancel-button";
  submitBtn.innerText = "Create";
  submitBtn.onclick = "createTask()";
  submitBtn.className = "create-button";

  butSec.appendChild(cancelBtn);
  butSec.appendChild(submitBtn);
  form.appendChild(butSec);

  dialog.appendChild(form);

  holder.appendChild(dialog);
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