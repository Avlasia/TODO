
//Display Date
const d = new Date();
var weekdayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
var date = `${weekdayNames[d.getDay()]} ${d.getDate()}, ${monthNames[d.getMonth()]}`

document.querySelector('#RightStuff h1').textContent = date;

//Tasks