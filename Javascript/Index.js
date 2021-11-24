
//Display Date (and other logic)
const d = new Date();
var weekdayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
var date = `${weekdayNames[d.getDay()]} ${d.getDate()}, ${monthNames[d.getMonth()]}`
var todayISO=d.toISOString().slice(0,10)
console.log(todayISO)
var tommorowISO = new Date()
tommorowISO.setDate(tommorowISO.getDate() + 1)
tommorowISO = tommorowISO.toISOString().slice(0,10)
console.log(tommorowISO)

document.querySelector('#RightStuff h1').textContent = date;

//Tasks
var todolist;
todolist = [
    ["School", "Test this task looks right", "Various details", "Computing", "2021-11-24", "1:00", true],
    ["School", "Something else", "", "", "2021-11-27", "5:00", false]
]

var donelist = []

var notes = [
    "Hello","bye"
]

var tasksCompleted = 0;
var tasksRequired = 5;

var currentList = "School"

var subjects = {}

var nHeading = document.getElementById("nHeading")
var nDesc = document.getElementById("nDesc")
var nSubject = document.getElementById("nSubject")
var nDate = document.getElementById("nDate")
var nTime = document.getElementById("nTime")
var nUrgent = document.getElementById("nUrgent")

var Today = document.getElementById("tToday")
var Tommorow = document.getElementById("tTomorrow")
var Later = document.getElementById("tLater")

function celebrateNT(){
    if(Today.textContent.replace(/\s/g,'') == 'Today Congratulations, You have cleared all tasks for today!'.replace(/\s/g,'')){
        document.getElementById('AllCleared').classList.remove('hidden')
    } else {
        document.getElementById('AllCleared').classList.add('hidden')
    }
    if(Tommorow.textContent.replace(/\s/g,'') == 'Tomorrow   Congratulations, You have no tasks tomorrow!'.replace(/\s/g,'')){
        document.getElementById('AllClearedt').classList.remove('hidden')
    } else {
        document.getElementById('AllClearedt').classList.add('hidden')
    }
    if(Later.textContent.replace(/\s/g,'') == 'Later/No Date Congratulations, You have no other tasks!'.replace(/\s/g,'')){
        document.getElementById('AllClearedl').classList.remove('hidden')
    } else {
        document.getElementById('AllClearedl').classList.add('hidden')
    }
    
}

function displayTask(taskNo, taskDetails){
    if(taskDetails[4]==todayISO){
        Today.innerHTML += `<p id="task${taskNo}" class="task"><img src="Images/Unchecked.png" onclick="completeTask(${taskNo})"><span class="tHeading">Do your work</span></p>`;
        task = document.getElementById('task'+taskNo);
        task.querySelector('.tHeading').textContent = taskDetails[1];
        if(taskDetails[5]!==''){
            var current = task.innerHTML;
            task.innerHTML = `<span class="tTime">Due: ${taskDetails[5]}</span>${current}`;
        }
        if(taskDetails[6]==true){ //Urg
            task.innerHTML += '<span class="tUrgent">!</span>';
        }
        if(taskDetails[3]!==''){ //Sub
            task.innerHTML += `<span class="tSub">${taskDetails[3]}</span>`;
        }

        if(taskDetails[2]!==''){ //Desc
            task.innerHTML += '<br><span class="tDesc">Do it.</span><br>';
            task.querySelector('.tDesc').textContent = taskDetails[2];
        } 

    } else if(taskDetails[4]== tommorowISO){
        Tommorow.innerHTML += `<p id="task${taskNo}" class="task"><img src="Images/Unchecked.png" onclick="completeTask(${taskNo})"><span class="tHeading">Do your work</span></p>`;
        task = document.getElementById('task'+taskNo);
        task.querySelector('.tHeading').textContent = taskDetails[1];
        if(taskDetails[5]!==''){
            var current = task.innerHTML;
            task.innerHTML = `<span class="tTime">Due: ${taskDetails[5]}</span>${current}`;
        }
        if(taskDetails[6]==true){ //Urg
            task.innerHTML += '<span class="tUrgent">!</span>';
        }
        if(taskDetails[3]!==''){ //Sub
            task.innerHTML += `<span class="tSub">${taskDetails[3]}</span>`;
        }

        if(taskDetails[2]!==''){ //Desc
            task.innerHTML += '<br><span class="tDesc">Do it.</span><br>';
            task.querySelector('.tDesc').textContent = taskDetails[2];
        } 

    } else {
        Later.innerHTML += `<p id="task${taskNo}" class="task"><img src="Images/Unchecked.png" onclick="completeTask(${taskNo})"><span class="tHeading">Do your work</span></p>`;
        task = document.getElementById('task'+taskNo);
        task.querySelector('.tHeading').textContent = taskDetails[1];
        if(taskDetails[5]!==''){
            var current = task.innerHTML;
            task.innerHTML = `<span class="tTime">Due: ${taskDetails[4]} ${taskDetails[5]}</span>${current}`;
        }
        if(taskDetails[6]==true){ //Urg
            task.innerHTML += '<span class="tUrgent">!</span>';
        }
        if(taskDetails[3]!==''){ //Sub
            task.innerHTML += `<span class="tSub">${taskDetails[3]}</span>`;
        }

        if(taskDetails[2]!==''){ //Desc
            task.innerHTML += '<br><span class="tDesc">Do it.</span><br>';
            task.querySelector('.tDesc').textContent = taskDetails[2];
        }
    }
    celebrateNT()
} 

function addNewTask(){
    if(nHeading.value){
        var h = nHeading.value
        var d = ""
        var da = ""
        var t = ""

        var i = 0;
        while(todolist[i] != '' && todolist[i] != undefined){
            i++
        }
        if(nDesc.value){d=nDesc.value}
        if(nDate.value){da=nDate.value}
        if(nTime.value){t=nTime.value}
        
        todolist[i] = [currentList,h,d,nSubject.value,da,t,nUrgent.checked]
        console.log(todolist)

        displayTask(i, todolist[i])
    } else {
        alert('Must include a task name')
    }
}

function completeTask(taskNo){
    document.getElementById("task"+taskNo).remove();
    donelist.push([[todayISO], todolist[taskNo]])
    todolist[taskNo] =''
    tasksCompleted++
    console.log(donelist)
    celebrateNT()
}

// document.getElementById("TaskForm").addEventListener("keyup", function(event) {
//     if (KeyboardEvent.keycode === 'Enter') {
//         addNewTask();
//     }
//   });

displayTask('0',todolist[0])
displayTask('1',todolist[1])
celebrateNT()


