# startup
Startup App Project for CS 260

# Elevator Pitch: GetOrganized
Have you ever wanted a simple, comprehensive portal for any and all productivity related utilities? GetOrganized
will enable you to create a full todo-list, organize these tasks on an interactive calendar, and add and 
view notes related to these tasks all in one wholistic application. In GetOrganized, you will be able to 
switch between three straightforward screens to view these different features, enabling you to get organized and 
optimized, unlocking your true productive potential!

# Features:
### TodoList (shown below)
- allows users to create, complete, edit, view, and delete tasks
- tasks will have a date on which they are due, a description, and custom tags that they can be grouped by
- in the "TodoList" page you can filter which tag groups are shown, search by task title, and choose how tasks are sorted
![todolist sketch](https://github.com/TheGreengo/startup/blob/main/tasks_sketch.jpg?raw=true)

### Calendar (shown below)
- gives users an overview of which tasks are due when
- allows for easy moving/rescheduling tasks
![calendar sketch](https://github.com/TheGreengo/startup/blob/main/calendar_sketch.jpeg)

### Notes (shown below)
- notes can be created for different task tag groups or tag groups of their own (i.e if you have a chemistry class a "Chem 101" tag could be used so that you can view just the notes that you've taken for chemistry)
- notes can be assigned to individual tasks to describe how the task should be completed or other important details
- notes' page allows user to filter and search through existing notes
![notes sketch](https://github.com/TheGreengo/startup/blob/main/note_sketch.jpg?raw=true)

# AWS Info:
I.P. Address: 3.136.43.25,

Login command: ssh -i ~/[Key File Path] ubuntu@[I.P. Address]

# URL:
http://getorganized.click/

# Notes:
- use &#; to include unicode characters in html.
- From Simon project: make sure the Caddyfiles are configured for each url that is going to be used (i.e. including simon.getorganized, not just getorganized) otherwise the webpage won't load
- From Simon project: use \<hr \/> at the end of a section in order to get a line dividing topical sections
- From Simon CSS project: one thing that I learned from this assignment was how to use bootstrap classes to stylize the page, in particular the nav html section. It's really convenient having the building blocks for a good menu that easy to implement.
- From destructuring: syntax of destructuring 
```javascript
const [a,b] = array;
``` 
- From startup HTML & CSS:
  - When using border-radius, you need to add a border radius to any divs within the containing div or the corners can poke over the border
  - To add a sub-point in .md files, do two extra spaces then a line.
  - Footer can be added using absolute positioning and content/page wrappers for the non-footer content
- From simon JS:
  - localStorage is a great way to keep track of things when not using an actual database
  - strings with replaced variables can be used to create CSS settings in the JS file
- From startup JS:
  - modify ```style.display``` to none in order to get ```div```s to disappear
  - input has a ```type=datetime-local``` option in order to enable selecting times
  - ```addEventListener``` can be used to add functionality to html tags
  - using```.className``` can make sure everything is styled correctly
  - when using ```id``` with a ```querySelector```, it will return the value of the first ```input``` with that id, even if it is no longer in use. 
- From simon service:
  - remember to have a index.js file as an entry point for node to modify the project
  - remember to run `npm init` and then `npm install express` to get node and express included 
- From simon db:
  - it's helpful to check that the pm2 services are working if there are server side errors
  - always double check that the environmental variables are saved in the development environment AND the server separately
- From simon login:
  - remember to import uuid, bcrypt, and cooki-parser services
  - use pm2 restart after importing packages on server
- From simon websocket:
  - if you deploy files to server before installing uuid on your development environment, you'll need to reinstall them in the production environment
  - the websocket package can be installed using ```npm install ws```
- From react reactivity: 
  - use 
  ```javascript
  const onChange = (e) => {
    updateText(e.target.value);
  };
  ```
  to update when a field is updated
- From React CLI:
  - use ```npm run build``` to create production ready version of react app, and then ```serve -s build``` to run it
- From React Router:
  - react-router and react-router-dom
