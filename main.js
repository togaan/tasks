// setting variables
let theInput = document.querySelector('#input_task');
let addButton = document.querySelector('.add_task .plus');
var tasksContainer = document.querySelector('.task_content');
var tasksCompleted = document.querySelector('.task_completed span')
let tasksCount = document.querySelector('.task_count span');
let tasksCountMassage = document.querySelector('.task_count');

// Empty array to store tasks.
var arrayOfTasks = [];

// check if there is data in local storage
if (localStorage.getItem('tasks')) {
    // add found data to array of tasks
    arrayOfTasks = JSON.parse(localStorage.getItem('tasks'));
}
getTasksFromLocalStorage();
chechOnEmptyStorage(arrayOfTasks);
// focus on input we use built in function focus()
window.onload = function () {
    theInput.focus()

}
write();
document.querySelector('#input_task').onmouseenter = function () {
    document.querySelector('.game_info').classList.add('di_no')
}

    


   




        


// add task 
addButton.onclick = function () {
    // if input is empty?
    if (theInput.value === '') {
        
       
    } else {
        var child = tasksContainer.querySelector('.task_box');
        if (child) {
            var mainSpan = document.querySelectorAll('.task_box');
            var taskList = [];
            mainSpan.forEach((s) => {
                taskList.push(s.firstChild.textContent)
            })
    
            if (taskList.includes(theInput.value) === true) {
            } else if ((taskList.includes(theInput.value) === false)) {
                addTaskToArray(theInput.value)
                theInput.value = '';
                chechOnEmptyStorage(arrayOfTasks);
                
               
                
            }   
           
        } else if (!child) {            
            addTaskToArray(theInput.value)
            theInput.value = '';
            chechOnEmptyStorage(arrayOfTasks);
            
            
            
            
        }
    }

}
 
// delete task
deletTask();

// add task to array.
function addTaskToArray(taskText) {
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    };
    // add task to array of tasks.
    arrayOfTasks.push(task);
    
    // add tasks from array of tasks to the page.
    addTaskToPageFrom(arrayOfTasks);
    
    // add tasks to local storage.
    addTaskToLocalStorage(arrayOfTasks);
   
    
}

// add restored data to the tasks
function addTaskToPageFrom(arrayOfTasks) {
    // remove all tasks from the page to avoid repeted data.
    tasksContainer.innerHTML = '';

    addButton.classList.add('hover');
    setTimeout(() => {
        addButton.classList.remove('hover');
    }, 2000);
    
    

    //loop on the array of tasks to get each task was stored in it
    arrayOfTasks.forEach((task) => {
        // create span for the new task
        let mainSpan = document.createElement('span');
        mainSpan.className = 'task_box';

        // check if task is completed?
        if (task.completed) {
            mainSpan.className = "task_box finished"
        }
        mainSpan.setAttribute('data-id', task.id);

        // create buttons to control the task.
        let markSpan = document.createElement('span');
        markSpan.className = 'mark_span';
    
        let deleteSpan = document.createElement('span');
        deleteSpan.className = 'delete';

        mainSpan.appendChild(document.createTextNode(task.title));
        markSpan.appendChild(document.createTextNode('Mark'));
        deleteSpan.appendChild(document.createTextNode('Delete'));
        mainSpan.appendChild(markSpan);
        mainSpan.appendChild(deleteSpan);
        tasksContainer.appendChild(mainSpan);
        calculate()
         
        
    })
}
    
function addTaskToLocalStorage(arrayOfTasks) {
    window.localStorage.setItem('tasks', JSON.stringify(arrayOfTasks));    
}    

/* after any reload to the page we need to display all tasks that we stored in 
 local storage on the page. to do that we get the data from local storage and run the
 function [addTaskToPageFrom()] */
function getTasksFromLocalStorage() {
    let data = window.localStorage.getItem('tasks');
    if (data) {
        let tasks = JSON.parse(data);
        addTaskToPageFrom(tasks);
    }
}
    

function deletTask() {
    document.addEventListener('click', (e) => {
        if (e.target.className === 'delete') {
            deleteTaskWithID(e.target.parentNode.getAttribute('data-id'));
            e.target.parentNode.remove();
            chechOnEmptyStorage(arrayOfTasks)
           
            calculate()
    
           
        }
        if (e.target.className === 'mark_span') {
            
            if (e.target.parentNode.classList.contains('task_box')) {
                finishTaskWithID(e.target.parentNode.getAttribute('data-id'));
                e.target.parentNode.classList.toggle('finished');
                calculate(); 
                
                
            } 
            
            
        }

    });
}
     
// delete task from local storage.
function deleteTaskWithID(taskid) {
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskid);
    addTaskToLocalStorage(arrayOfTasks)
} 
// finshed task from local storage      
function finishTaskWithID(taskCompleatedID) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id == taskCompleatedID) {
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
        }  
    }
    addTaskToLocalStorage(arrayOfTasks);
}
    
  
    
         
deleteAllTasks();  
    

// function to delete and marck all tasks
function deleteAllTasks() {
    let tasksCompleted = document.querySelector('.task_completed span')
    var controlAll = document.querySelector('.control_all');
    var deleteAll = document.createElement('button');
    deleteAll.className = 'delete_all';
    deleteAll.appendChild(document.createTextNode('Dleate All Tasks'));
    var markAll = document.createElement('button');
    markAll.className = 'mark_all';
    markAll.appendChild(document.createTextNode('Mark All Tasks'));

    var reMarkAll = document.createElement('button');
    reMarkAll.className = 're_mark_all';
    reMarkAll.appendChild(document.createTextNode('Remark All Tasks'));
    
    controlAll.appendChild(deleteAll);
    controlAll.appendChild(markAll);
    controlAll.appendChild(reMarkAll);
   

    document.addEventListener('click', (e) => {
        if (e.target.className === 'delete_all') {
            tasksContainer.innerHTML = '';
            window.localStorage.removeItem('tasks');
            arrayOfTasks.length = 0;
            chechOnEmptyStorage(arrayOfTasks);

            calculate()
           
            tasksCount.innerHTML = 0;
            document.querySelector('.control_all').classList.remove('active')
            let noTask = document.querySelector('.task_stats .no_task');
            noTask.classList.remove('di_no');
        }
        if (e.target.className === 'mark_all') {
            Array.from(document.querySelectorAll('.task_box')).forEach((task) => {
                task.classList.add('finished');
                calculate()
                e.target.classList.add('di_no');
                reMarkAll.classList.add('di_bl');
                for (let i = 0; i < arrayOfTasks.length; i++) {
                    arrayOfTasks[i].completed = true;  
                }
                addTaskToLocalStorage(arrayOfTasks);
            }) 
        }
        if (e.target.classList.contains('re_mark_all')) {
            Array.from(document.querySelectorAll('.task_box')).forEach((task) => {
                task.classList.remove('finished');
                calculate();
                e.target.classList.remove('di_bl');
                markAll.classList.remove('di_no');
                for (let i = 0; i < arrayOfTasks.length; i++) {
                    arrayOfTasks[i].completed = false;   
                }
                addTaskToLocalStorage(arrayOfTasks);
            }) 
        }
    })

}

function chechOnEmptyStorage(arrayOfTasks) {
    if (arrayOfTasks.length !== 0) {
        document.querySelector('.task_stats .no_task').classList.add('di_no');
        document.querySelector('.control_all').classList.add('active')
    } else {
        document.querySelector('.task_stats .no_task').classList.remove('di_no');
        document.querySelector('.control_all').classList.remove('active')
    }
}

// calculate completed tasks
function calculate() {
    //calculate all tasks
    tasksCount.innerHTML = document.querySelectorAll('.task_content .task_box').length;
    //calculate completed tasks
    tasksCompleted.innerHTML = document.querySelectorAll('.task_content .finished').length;
    
}

// write your task
function write() {
    var gameInfo = document.createElement("div");
    var gameInfoText = document.createTextNode('');
    gameInfo.appendChild(gameInfoText);
    gameInfo.className = 'game_info';
    var addTask = document.querySelector('.add_task')
    addTask.appendChild(gameInfo)


    var timePerLetter = 150;
    var newLineCharacter = '|';
    function printOut(str) {
        var i = 0;
        (function main() {
            var char = str[i++];
            gameInfoText.nodeValue += char == newLineCharacter ? '\n' : char;
            if (i < str.length)
                setTimeout(main, timePerLetter);
            
        })();
    }
    printOut('Write Your Task Here...')
}









