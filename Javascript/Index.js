
//Display Date (and other logic)
const d = new Date();
var weekdayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
var date = `${weekdayNames[d.getDay()]} ${d.getDate()}, ${monthNames[d.getMonth()]}`

//var todayISO=d.toISOString().slice(0,10)
var todayISO = d.toLocaleDateString("sv")
console.log(todayISO)

var tommorowISO = new Date()
tommorowISO.setDate(tommorowISO.getDate() + 1)
tommorowISO = tommorowISO.toLocaleDateString("sv")
console.log(tommorowISO)

document.querySelector('#RightStuff h1').textContent = date;


//Tasks
var lists = ['School','Chores']

var todolist;
todolist = [
    ["", "Test this task looks right", "Various details", "", "2021-11-24", "1:00", true],
    ["School", "Something else", "", "", "2021-11-27", "5:00", false]
]

var donelist = []

var notes = [
    "Hello","bye"
]

var tasksCompleted = 0;
var tasksRequired = 5;

var currentList = "All"

var subgroup = {}

var nHeading = document.getElementById("nHeading")
var nDesc = document.getElementById("nDesc")
var nSubject = document.getElementById("nSubject")
var nDate = document.getElementById("nDate")
var nTime = document.getElementById("nTime")
var nUrgent = document.getElementById("nUrgent")

var Today = document.getElementById("tToday")
var Tommorow = document.getElementById("tTomorrow")
var Later = document.getElementById("tLater")

var nextTaskId = 0 
var NextTaskDisplay = document.getElementById("NextTask")

var listDisplay = document.getElementById("MyLists")

var RightShown = true

var selCol = ''

function celebrateNT(){
    if(Today.textContent.replace(/\s/g,'') == 'Today Congratulations, You have cleared all tasks for today!'.replace(/\s/g,'')){
        document.getElementById('AllCleared').classList.remove('hidden')
    } else {
        document.getElementById('AllCleared').classList.add('hidden')
    }
    if(Tommorow.textContent.replace(/\s/g,'') == 'Tomorrow Congratulations, You have no tasks tomorrow!'.replace(/\s/g,'')){
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
    if(currentList != 'All'){
        if(currentList != taskDetails[0]){
            return null
        }
    }
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
            task.classList.add(subgroup[taskDetails[3]])
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
            task.classList.add(subgroup[taskDetails[3]])
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
        var current = task.innerHTML;
        if(taskDetails[4]!=='' && taskDetails[5]!==''){
            task.innerHTML = `<span class="tTime">Due: ${taskDetails[4]} ${taskDetails[5]}</span>${current}`;
        } else if(taskDetails[4]!==''){
            task.innerHTML = `<span class="tTime">Due: ${taskDetails[4]}</span>${current}`;
        } else if(taskDetails[5]!==''){
            task.innerHTML = `<span class="tTime">Due: ${taskDetails[5]}</span>${current}`;
        }
        if(taskDetails[6]==true){ //Urg
            task.innerHTML += '<span class="tUrgent">!</span>';
        }
        if(taskDetails[3]!==''){ //Sub
            task.classList.add(subgroup[taskDetails[3]])
            task.innerHTML += `<span class="tSub">${taskDetails[3]}</span>`;
        }

        if(taskDetails[2]!==''){ //Desc
            task.innerHTML += '<br><span class="tDesc">Do it.</span><br>';
            task.querySelector('.tDesc').textContent = taskDetails[2];
        }
    }
} //Not optimised at all

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

    displayNextTask()
    celebrateNT()
}

function completeTask(taskNo){
    document.getElementById("task"+taskNo).remove();
    donelist.push([[todayISO], todolist[taskNo]])
    todolist[taskNo] =''
    tasksCompleted++
    console.log(donelist)
    celebrateNT()
    displayNextTask()
    taskProgress()
}

function getNextTask(){
    var nextTask = ['',''];
    var i = 0;
    nextTaskId = 0;
    while(todolist[i] !== undefined){
        if(todolist[i][4]){
        if(todolist[i][4] !== ''){
            console.log(todolist[i][4])
            if(nextTask[0]==''){
                nextTask[0]=todolist[i].slice(4,5);
                nextTaskId = i;
                console.log('1')
            } else if(todolist[i][4]<nextTask[0]){
                nextTask[0]=todolist[i].slice(4,5);
                nextTaskId = i;
                console.log('2')
            } else if(todolist[i][4]==nextTask[0]){

                if(todolist[i][5] !== ''){
                    if(nextTask[1]==''){
                        nextTask[1]=todolist[i].slice(5,6);
                        nextTaskId = i;
                        console.log('3')
                    } else if(todolist[i][5]<nextTask[1]){
                        nextTask[1]=todolist[i].slice(5,6);
                        nextTaskId = i;
                        console.log('4')
                }
            }
        } else {
            console.log('day = ""')
        }}}
        console.log(nextTask)
        i++;
        if(todolist[nextTaskId]===''){
            nextTaskId=i;
        }
        console.log(nextTaskId)
}
}

function displayNextTask(){
    getNextTask()
    if(todolist[nextTaskId] === '' || todolist[nextTaskId] === undefined){
        NextTaskDisplay.innerHTML = '<img class="invert" src="Images/Checked.png"><span id=NextTaskTitle>Woo! No Tasks!</span><br><span id=NextTaskDesc></span>'
    } else {
        NextTaskDisplay.innerHTML = '<img class="invert" src="Images/Unchecked.png" onclick="completeNextTasks();"><span id=NextTaskTitle>Woo! No Tasks!</span><br><span id=NextTaskDesc></span>'
        NextTaskDisplay.querySelector("#NextTaskTitle").textContent = todolist[nextTaskId][1];
        NextTaskDisplay.querySelector("#NextTaskDesc").textContent = todolist[nextTaskId][2];
}
}

function completeNextTasks(){
    completeTask(nextTaskId)
}

function rightToggle(){
    if(RightShown){
        document.getElementById("Main").classList.remove('rightSquish');
        document.getElementById("RightStuff").classList.add('hidden');
    } else {
        document.getElementById("Main").classList.add('rightSquish');
        document.getElementById("RightStuff").classList.remove('hidden');
    }
    RightShown = !RightShown;
}

function loadtasks(listName){
    currentList = listName;
    Today.innerHTML = '<h1>Today</h1><p id="AllCleared" class="allclear hidden">Congratulations, You have cleared all tasks for today!</p>';
    Tommorow.innerHTML = '<h1>Tomorrow</h1><p id="AllClearedt" class="allclear">Congratulations, You have no tasks tomorrow!</p>';
    Later.innerHTML = '<h1>Later/No Date</h1><p id="AllClearedl" class="allclear">Congratulations, You have no other tasks!</p>';

    document.querySelector('.Active').classList.remove('Active')
    document.getElementById(currentList).classList.add('Active')
    var i = 0
    while(todolist[i] !== undefined){
        if(todolist[i] !== ''){
            displayTask(i,todolist[i])
        }
        i++;
    }

    celebrateNT()
}

function createNewList(newList){
    lists.push(newList);
    displayLists()
}

function displayLists(){
    listDisplay.innerHTML = '';
    var i = 0;
    while(lists[i] !== undefined){
        listDisplay.innerHTML += `<p id="${lists[i]}" onclick="loadtasks('${lists[i]}')">${lists[i]}</p>`;
        i++;
    }
}

function setCol(c){
    selCol=c
    if(document.querySelector('.selbord')){
        document.querySelector('.selbord').classList.remove('selbord')
    }
    document.getElementById('c'+c).classList.add('selbord')
}

function isAlphaNumeric(str) {
    var code, i, len;
  
    for (i = 0, len = str.length; i < len; i++) {
      code = str.charCodeAt(i);
      if (!(code > 47 && code < 58) && // numeric (0-9)
          !(code > 64 && code < 91) && // upper alpha (A-Z)
          !(code > 96 && code < 123)) { // lower alpha (a-z)
        return false;
      }
    }
    return true;
}; 
//Function obatained from 'Michael Martin-Smucker' @https://stackoverflow.com/questions/4434076/best-way-to-alphanumeric-check-in-javascript

function closePU(){
    document.getElementById('pop-up').classList.add('hidden')
    document.getElementById('ClaimMessage').classList.add('hidden')
    document.getElementById('SubGroupForm').classList.add('hidden')
}

function claimReward(){
    if(tasksCompleted >= tasksRequired){
        document.getElementById('pop-up').classList.remove('hidden')
        document.getElementById('ClaimMessage').classList.remove('hidden')
        tasksCompleted-=tasksRequired
    } else {
        alert("Not enough tasks completed")
    } 
}

function showSubForm(){
    document.getElementById('pop-up').classList.remove('hidden')
    document.getElementById('SubGroupForm').classList.remove('hidden')
}

function createSubGroup(){
    subgroupname = document.getElementById("Subgroup").value
    if(isAlphaNumeric(subgroupname)){
        if(subgroupname !== ''){
            document.getElementById('nSubject').innerHTML+=`<option value="${subgroupname}">${subgroupname}</option>`;
        }else{
            alert("Name must be entered")
        }
    } else {
        alert("Name must be letters and numbers only")
    }
    subgroup[subgroupname] = selCol;
}

function taskProgress(){
    document.getElementById('noComp').textContent=tasksCompleted;
    document.getElementById('noReq').textContent=tasksRequired;
}

function updateTaskReq(){
    if(document.getElementById("newtaskreq").value){
    tasksRequired = document.getElementById("newtaskreq").value;
    }
}

document.getElementById('TaskForm').addEventListener("keyup", function(event) {
    if (event.code === 'Enter') {
        addNewTask();
        getNextTask();
    }
});

document.getElementById('NewList').addEventListener("keyup", function(event) {
    if (event.code === 'Enter') {
        var newList = document.getElementById('NewList').value;
        if(isAlphaNumeric(newList)){
            if(newList !== ''){
                createNewList(newList)
                document.getElementById('NewList').value = ''
            }else{
                alert("Name must be entered")
            }
        } else {
            alert("Name must be letters and numbers only")
        }
    }
});

// document.getElementById('NewNote').addEventListener("keyup", function(event) {
//     if (event.code === 'Enter') {
//         var newNote = document.getElementById('NewNote').value;

//         document.getElementById("mynotes").innerHTML += `<li id=>${newNote}</li>`;
//     }
// });


loadtasks(currentList)
displayNextTask()
taskProgress()
closePU()
