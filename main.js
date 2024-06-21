let userInput = document.getElementById("user-input");
let addBtn = document.getElementById("add-btn");
let taskList = [];
let taskBoard = document.querySelector(".task-board")
let tabs = document.querySelectorAll(".task-tabs div")
let mode = "all"
let filterList = []
let underLine = document.getElementById("under-line");

userInput.addEventListener("keydown", function(e){
   if(e.keyCode ===  13){
    addTask(e)
   }
})
addBtn.addEventListener("click",addTask);
for(let i=1; i < tabs.length; i++){
    tabs[i].addEventListener("click", function(e){
        filter(e)
    })
}
function addTask(){
    let userValue = userInput.value;
    if(userValue === "") {return alert ("할 일을 입력하세요.")}
    task = {
        content : userInput.value,
        id : randomID(),
        isComplete : false
    }
    taskList.push(task);
    console.log(taskList);
    userInput.value = ""
    render()
}

function render(){
    let resultHTML = ""
    let list = [];
    if(mode === "all"){
        list = taskList;
    }else{
        list = filterList;
    }

    for(let i=0;i<list.length;i++){
        if(list[i].isComplete == true){
            resultHTML +=
            `
            <div class="task ck-task">
                    <div class="task-info ck-info">${list[i].content}</div>
                    <div>
                        <button class="back" onclick = "toggleDone('${list[i].id}')"><i class="fa fa-undo" aria-hidden="true"></i></button>
                        <button class="del" onclick = "delTask('${list[i].id}')"><i class="fa fa-trash" aria-hidden="true"></i></button>
                    </div>
                </div>
            `
            
        }else if(list[i].isComplete == false){
            resultHTML +=
            `
            <div class="task">
                    <div class="task-info">${list[i].content}</div>
                    <div>
                        <button class="check" onclick = "toggleDone('${list[i].id}')"><i class="fa fa-check" aria-hidden="true"></i></button>
                        <button class="del" onclick = "delTask('${list[i].id}')"><i class="fa fa-trash" aria-hidden="true"></i></button>
                    </div>
                </div>
            `
    
        }


    }
    taskBoard.innerHTML = resultHTML;
}

function toggleDone (id){
    console.log(id)
    for(let i =0; i < taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete
            break
        }
    }
    filter()
}

function delTask (id){
    console.log(id)
    for(let i = 0; i < taskList.length; i++){
        if(taskList[i].id == id){
            taskList.splice(i,1);
            break
        }
    }
    
        filter()
}
function filter (e){
    
    if(e){
        mode = e.target.id;
        underLine.style.width = e.target.offsetWidth + "px";
        underLine.style.left = e.target.offsetLeft + "px";
        underLine.style.top = e.target.offsetTop + (e.target.offsetHeight - 4) + "px"
    }
    filterList = []
    if(mode === "ongoing"){
        for(let i = 0; i<taskList.length; i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i]);
                console.log("진행중",filterList )
            }
        }
    }else if(mode === "end"){
        for(let i = 0; i<taskList.length; i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i]);
                console.log("끝",filterList )
            }
        }
    }
    render()
}


function randomID (){
    return '_' + Math.random().toString(36).substr(2, 9);
}