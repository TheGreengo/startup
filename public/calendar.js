let calDB = [];

let type = "Month";
let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

let currId = 2;
let iteration = 0;

function getCalDays() {
    thing = new Date();
    return new Date(thing.getFullYear(), thing.getMonth()+1,0).getDate();
}

function getOffSet(){
    thing = new Date();
    thing = new Date(thing.getFullYear(), thing.getMonth(),1).getDay();
    return thing;
}

async function loadEvents(){
    calDB = [];
    const userName = localStorage.getItem('userName');
    console.log("called");
    try {
        const response = await fetch(`/api/events/${userName}`);
        eventsText = await response.json();
        console.log(JSON.stringify(eventsText));
        localStorage.setItem('events', JSON.stringify(eventsText));
    } catch {
        calDB = [];
        console.log("failed call");
    }
    calDB = localStorage.getItem('events');
    generateCalendar();
}

async function addEvent() {
    const userName = localStorage.getItem('userName');
    if (userName) {
        let date = document.querySelector(`#dateInput${iteration}`);
        let title = document.querySelector(`#titleInput${iteration}`);
        const newEvent = {
            date: new Date(date.value), 
            title: title.value,
            user: userName
        };

        try {
            const response = await fetch('/api/event', {
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify(newEvent),
            });
      
            // Store what the service gave us as the high scores
            const events = await response.json();
            localStorage.setItem('events', JSON.stringify(events));
          } catch {
            // If there was an error then just track scores locally
            calDB.push(newEvent);
            localStorage.setItem('events', calDB);
          }
    }
    const holder = document.querySelector('.overlay');
    holder.style.display = "none";
    loadEvents();
    broadcastEvent(userName, "creation", "created a new event");
}

function generateCalendar() {
    calDB = JSON.parse(localStorage.getItem('events'));
    if (type === "Day") {
        const cal = document.querySelector('#cal');
        cal.innerHTML = "";

        const dayHead = document.createElement('div');
        dayHead.innerText = "3/6/23";
        dayHead.className = "week-head";
        cal.appendChild(dayHead);

        // create week
        const DayCal = document.createElement('div');
        DayCal.className = "week-cal";

        const legchunk = document.createElement('div');
        legchunk.className = "week-day";

        for (let i = 0; i < 15; i++) {
            if (i === 6) {
                const legend = document.createElement('div');
                legend.innerText = '12 pm';
                legend.className = "hours";
                legchunk.appendChild(legend);
            } else {
                const legend = document.createElement('div');
                const mer = i < 6 ? "am" : "pm";
                legend.innerText = `${(i + 6) % 12} ${mer}`;
                legend.className = "hours";
                legchunk.appendChild(legend);
            }
        }
        DayCal.appendChild(legchunk);

        const column = document.createElement('div');
        column.className = "day-day";
        for (let i = 0; i < 14; i++) {
            const chunk = document.createElement('div');
            chunk.className = "hour";
            column.appendChild(chunk);
        }
        const chunk = document.createElement('div');
        chunk.className = "last-hour";
        column.appendChild(chunk);
        DayCal.appendChild(column);

        cal.appendChild(DayCal);

    } else if (type === "Week") {
        // get calendar holder
        const cal = document.querySelector('#cal');
        cal.innerHTML = "";

        const weekHead = document.createElement('div');
        weekHead.innerText = "3/6/23 - 3/12/23";
        weekHead.className = "week-head";
        cal.appendChild(weekHead);

        // create week
        const WeekCal = document.createElement('div');
        WeekCal.className = "week-cal";

        const space = document.createElement('div');
        WeekCal.appendChild(space);
        for (let i = 0; i < 7; i++) {
            const Weekday = document.createElement('div');
            Weekday.className = "weekday week-weekday";
            Weekday.innerText = days[i];
            WeekCal.appendChild(Weekday);
        }

        const legchunk = document.createElement('div');
        legchunk.className = "week-day";

        for (let i = 0; i < 15; i++) {
            if (i === 6) {
                const legend = document.createElement('div');
                legend.innerText = '12 pm';
                legend.className = "hours";
                legchunk.appendChild(legend);
            } else {
                const legend = document.createElement('div');
                const mer = i < 6 ? "am" : "pm";
                legend.innerText = `${(i + 6) % 12} ${mer}`;
                legend.className = "hours";
                legchunk.appendChild(legend);
            }
        }
        WeekCal.appendChild(legchunk);

        for (let i = 0; i < 7; i++) {
            const column = document.createElement('div');
            column.className = "week-day";
            for (let i = 0; i < 14; i++) {
                const chunk = document.createElement('div');
                chunk.className = "hour";
                column.appendChild(chunk);
            }
            const chunk = document.createElement('div');
            chunk.className = "last-hour";
            column.appendChild(chunk);
            WeekCal.appendChild(column);
        }

        cal.appendChild(WeekCal);
        // populate events

    } else {
        const cal = document.querySelector('#cal');
        cal.innerHTML = "";
        const Month = document.createElement('div');
        Month.className = "month";
        thing = new Date();
        Month.textContent = months[thing.getMonth()];
        cal.appendChild(Month);

        const Week = document.createElement('div');
        Week.className = "weeks";
        for (let i = 0; i < 7; i++) {
            const Weekday = document.createElement('div');
            Weekday.className = "weekday";
            Weekday.innerText = days[i];
            Week.appendChild(Weekday);
        }
        cal.appendChild(Week);

        let numDays = getCalDays();
        let off = getOffSet() - 1;
        console.log(off);

        const Weeks = document.createElement('div');
        Weeks.className = "weeks";

        if (off !== -1) {
            for (let i = 0; i < off; i++) {
                const Day = document.createElement('div');
                Weeks.appendChild(Day);
            }
        }

        for (let i = 0; i < numDays; i++) {
            const Day = document.createElement('div');
            Day.className = "day";
            Day.innerText = (i+1);
            let thing = new Date();
            for (let j = 0; j < calDB.length; j++) {
                testDate = new Date(calDB[j].date);
                if ((testDate.getMonth() === thing.getMonth()) && (testDate.getDate() === i)) {
                    const even = document.createElement('div');
                    even.className = "event b";
                    even.innerText = calDB[j].title;
                    Day.appendChild(even);
                }
            }
            Weeks.appendChild(Day);
        }
        cal.appendChild(Weeks);
        // populate events
    }
}

function getDialog() {
    const holder = document.querySelector('.overlay');
  
    holder.style.display = "block";
  
    const dialog = document.createElement('div');
    dialog.className = "dialog-cal";
    dialog.innerText = "";
  
    //now to create the dialog
    // first a header
    const header = document.createElement('div');
    header.className = "week-head";
    header.innerText = "New Event";
    dialog.appendChild(header);
    // then a form?
    const form = document.createElement('div');
    form.className = "cal-form";
    form.innerText = "";
    form.addEventListener("submit",() => addEvent());
  
    // then a date selector
    const titleSec = document.createElement('div');
    titleSec.className = "cal-dialog-sec";
    const titleLabel = document.createElement('label');
    const titleInput = document.createElement('input');
    titleInput.id = `titleInput${iteration}`;
  
    titleInput.type = "text";
    titleLabel.innerText = "Enter a title for your event: ";
  
    titleSec.appendChild(titleLabel);
    titleSec.appendChild(titleInput);
    form.appendChild(titleSec);
  
    const dateSec = document.createElement('div');
    dateSec.className = "cal-dialog-sec";
    const dateLabel = document.createElement('label');
    const dateInput = document.createElement('input');
  
    dateInput.type = "datetime-local";
    dateInput.id = `dateInput${iteration}`;
    dateLabel.innerText = "Select a date for your event: ";
  
    dateSec.appendChild(dateLabel);
    dateSec.appendChild(dateInput);
    form.appendChild(dateSec);
    
    // then a cancel and submit button
  
    const butSec = document.createElement('div');
    butSec.className = "notes-dialog-sec";
    butSec.innerHTML = '<button class="cancel-button" onclick="cancelEvent()">Cancel</button> <button class="create-button" onclick="addEvent()">Create</button>';
    form.appendChild(butSec);
  
    dialog.appendChild(form);
  
    holder.appendChild(dialog);
}

function cancelEvent() {
  const holder = document.querySelector('.overlay');
  holder.style.display = "none";
}

function setType(newType){
    type = newType;
    loadEvents();
}

let socket;

function configureWebSocket() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    socket.onopen = (event) => {
      displayMsg('system', 'calendar', 'connected');
    };
    socket.onclose = (event) => {
      displayMsg('system', 'calendar', 'disconnected');
    };
    socket.onmessage = async (event) => {
      const msg = JSON.parse(await event.data.text());
      if (msg.type === "creation") {
        displayMsg('player', msg.from, `scored ${msg.value.score}`);
      }
    };
}

function displayMsg(cls, from, msg) {
    const chatText = document.querySelector('#chat');
    chatText.innerHTML =
      `<div class="event"><span class="${cls}-event">${from}</span> ${msg}</div>` + chatText.innerHTML;
};

function broadcastEvent(from, type, value) {
    const event = {
      from: from,
      type: type,
      value: value,
    };
    socket.send(JSON.stringify(event));
};
/*
Calendar:
 - add events (on clicking on day) [dialog]
 - edit/delete events (on clicking event)
 - necessitates a list of dates with a type for events
   - date (date)
   - type (string array)
   - title (string)
   - attached notes (number array)
   - color (string)
 - get a function to create the daily/weekly/monthly calendars
   depending on what has been selected
*/
loadEvents();
configureWebSocket();