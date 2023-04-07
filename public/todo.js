let todoDB = [];

let currId = 2;
let iteration = 0;

async function loadTodos() {
  todoDB = [];
  const userName = localStorage.getItem('userName');
  try {
    const response = await fetch(`/api/tasks/${userName}`);
    taskText = await response.json();
    localStorage.setItem('tasks', JSON.stringify(taskText));
  } catch {
    todoDB = [];
    console.log("failed call");
  }
  todoDB = localStorage.getItem('tasks');

  createTodos();
}

async function addTodo() {
  const userName = localStorage.getItem('userName');

  const type = document.querySelector(`#typeInput${iteration}`);
  const date = document.querySelector(`#dateInput${iteration}`);
  const desc = document.querySelector(`#titleInput${iteration}`);

  const newTask = {
    user: userName,
    type: type.value,
    title: desc.value,
    date: date.value
  };
  
  try {
    const response = await fetch('/api/task', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newTask),
    });

    // Store what the service gave us as the high scores
    const tasks = await response.json();
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } catch {
    // If there was an error then just track scores locally
    todoDB.push(newtask);
    localStorage.setItem('tasks', todoDB);
  }

  const holder = document.querySelector('.overlay');
  holder.style.display = "none";

  loadTodos();
}

async function deleteTask(id) {
  console.log("happening");
  try {
    const response = await fetch(`api/deleteTask/${id}`);
  } catch {
    console.log("problems");
  }
  loadTodos();
}

function createTodos() {
  todoDB = JSON.parse(localStorage.getItem('tasks'));
  const holder = document.querySelector('#display');
  holder.innerHTML = "";

  if (todoDB.length === 0) {
    holder.innerHTML = '<h3>No tasks to display</h3>';
  }

  else {
    for (let i = 0; i < todoDB.length; i++) {
      const newTask = document.createElement('div');
      newTask.className = "task";
  
      const compBtn = document.createElement('button');
      compBtn.textContent = `${String.fromCodePoint(10004)}`;
      compBtn.className = "comp-btn";
      compBtn.onclick = function() {
        console.log("wkljer");
        deleteTask(todoDB.id);
      };
      newTask.appendChild(compBtn);
  
      const editBtn = document.createElement('button');
      editBtn.textContent = "Edit";
      editBtn.className = "edit-btn";
      newTask.appendChild(editBtn);
  
      const taskMN = document.createElement('div');
      taskMN.className = "task-mn";
  
      const desc = document.createElement('div');
      desc.innerText = `Description: ${todoDB[i].title}`;
  
      const typ = document.createElement('div');
      typ.innerText = `Type: ${todoDB[i].type}`;
  
      const dt = document.createElement('div');
      const tempDate = new Date(todoDB[i].date);
      dt.innerText = `Date: ${tempDate.getMonth()+1}-${tempDate.getDate()}-${tempDate.getFullYear() - 2000}`;
  
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
  dateInput.id = `dateInput${iteration}`;
  dateInput.value = "";
  dateLabel.innerText = "Select a due date for your task: ";

  dateSec.appendChild(dateLabel);
  dateSec.appendChild(dateInput);
  form.appendChild(dateSec);
  // then a title input
  const titleSec = document.createElement('div');
  titleSec.className = "todo-dialog-sec";
  const titleLabel = document.createElement('label');
  const titleInput = document.createElement('input');
  titleInput.id = `titleInput${iteration}`;

  titleInput.type = "text";
  titleInput.value = "";
  titleLabel.innerText = "Enter a description for your task: ";

  titleSec.appendChild(titleLabel);
  titleSec.appendChild(titleInput);
  form.appendChild(titleSec);
  // then a type input
  const typeSec = document.createElement('div');
  typeSec.className = "todo-dialog-sec";
  const typeLabel = document.createElement('label');
  const typeInput = document.createElement('input');
  typeInput.id = `typeInput${iteration}`;

  typeInput.type = "text";
  typeLabel.innerText = "Enter a type for your task: ";

  typeSec.appendChild(typeLabel);
  typeSec.appendChild(typeInput);
  typeInput.value = "";
  form.appendChild(typeSec);
  // then a cancel and submit button

  const butSec = document.createElement('div');
  butSec.className = "todo-dialog-sec";
  butSec.innerHTML = '<button class="cancel-button" onclick="cancelTask()">Cancel</button> <button class="create-button" onclick="addTodo()">Create</button>';
  form.appendChild(butSec);

  dialog.appendChild(form);

  holder.appendChild(dialog);
}

function newTodo() {

  const type = document.querySelector(`#typeInput${iteration}`);
  const date = document.querySelector(`#dateInput${iteration}`);
  const desc = document.querySelector(`#titleInput${iteration}`);
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

loadTodos();