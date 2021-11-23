
//Display Date
const d = new Date();
var weekdayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
var date = `${weekdayNames[d.getDay()]} ${d.getDate()}, ${monthNames[d.getMonth()]}`
var todayISO=d.toISOString().slice(0,10)

document.querySelector('#RightStuff h1').textContent = date;

//Tasks
var todolist;
todolist = [
    ["School", "Test this task looks right", "Various details", "Computing", "2021-11-23", "1:00", true]
]

var subjects = {}

var nHeading = document.getElementById("nHeading")
var nDesc = document.getElementById("nDesc")
var nSubject = document.getElementById("nSubject")
var nDate = document.getElementById("nHeading")
var nTime = document.getElementById("nHeading")
var nUrgent = document.getElementById("nUrgent")

var Today = document.getElementById("tToday")
var Tommorow = document.getElementById("tTomorrow")
var Later = document.getElementById("tLater")

function displayTask(taskNo, taskDetails, due){
    if(taskDetails[4]==todayISO){
        Today.innerHTML += `<p id="task${taskNo}" class="task"><img src="Images/Unchecked.png"><span class="tHeading">Do your work</span></p>`
        task = document.getElementById('task'+taskNo);
        task.querySelector('.tHeading').textContent = taskDetails[1]
        if(taskDetails[5]!==''){
            var current = task.innerHTML
            task.innerHTML = `<span class="tTime">Due: ${taskDetails[5]}</span>${current}`
        } else {
            console.log("fail")
        }
        if(taskDetails[6]==true){ //Urg
            task.innerHTML += '<span class="tUrgent">!</span>'
        }
        if(taskDetails[2]!==''){ //Desc
            task.innerHTML += '<br><span class="tDesc">Do it.</span><br>'
            task.querySelector('.tDesc').textContent = taskDetails[2]
        } 

    } else if(due=='Tomorrow'){

    } else {
        console.log("fail")
    }
} 

displayTask('0',todolist[0],'Today')

/*
                <span class="tTime">Due: 23/11/2021 5:00</span>
                <img src="Images/Unchecked.png">
                <span class="tHeading">Do your work</span>
                <span class="tUrgent">!</span><span class="tSub">Other</span>
                <span class="taskDetails"><br>
                <span class="tDesc">Do it.</span><br>
                
                
                </span>
*/ 