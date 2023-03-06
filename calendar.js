let calDB = [];
let type = "Month";
let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function getCalDays() {
    thing = new Date();
    return new Date(thing.getFullYear(), thing.getMonth()+1,0).getDate();
}

function getOffSet(){
    thing = new Date();
    return new Date(thing.getFullYear(), thing.getMonth()-1,1).getDay();
}

function generateCalendar() {
    if (type === "Day") {
        // get calendar holder
        const cal = document.querySelector('#cal');
        cal.innerHTML = "";
        // create day

        // populate events

    } else if (type === "Week") {
        // get calendar holder
        const cal = document.querySelector('#cal');
        cal.innerHTML = "";

        // create week
        const WeekCal = document.createElement('div');
        WeekCal.className = "week-cal";

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
            Weeks.appendChild(Day);
        }
        cal.appendChild(Weeks);
        // populate events
    }
}

function setType(newType){
    type = newType;
    generateCalendar();
}
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

generateCalendar();