let calDB = [];

function getCalDays() {
    thing = new Date();
    return new Date(thing.getFullYear(), thing.getMonth()+1,0).getDate();
}

function getOffSet(){
    thing = new Date();
    thang = new Date(thing.getFullYear(), thing.getMonth()-1,1);
    console.log(thang);
    return thang.getDay();
}

function logDays() {
    console.log(getOffSet());
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
 - get a function to create the daily/weekly/monthly calendars
   depending on what has been selected
*/