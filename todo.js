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
  header.className = "todo-form";
  header.innerText = "";

  // then a date selector
  const dateInput = document.createElement('input');

  form.appendChild(dateInput);
  // then a title input
  const titleInput = document.createElement('input');

  form.appendChild(dateInput);
  // then a type input
  const typeInput = document.createElement('input');

  form.appendChild(dateInput);
  // then a cancel and submit button

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