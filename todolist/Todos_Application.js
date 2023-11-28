let userInput = document.getElementById("userInput");
let taskContainer = document.getElementById("taskContainer");
let addBtn = document.getElementById("addBtn");
let saveBtnEl = document.getElementById("saveBtn");
let wishingEl = document.getElementById("wishing");

// Get the current time
const currentTime = new Date();
const currentHour = currentTime.getHours();

// Determine the time of day
let timeOfDay;

if (currentHour >= 5 && currentHour < 12) {
    timeOfDay = "Good Morning!";
} else if (currentHour >= 12 && currentHour < 18) {
    timeOfDay = "Good Afternoon!";
} else {
    timeOfDay = "Good Evening!";
}

wishingEl.textContent = timeOfDay;

function getTodoListFromLocalStorage() {
    let stringifiedList = localStorage.getItem("myList");
    let parsedList = JSON.parse(stringifiedList);
    if (parsedList === null) {
        return [];
    } else {
        return parsedList;
    }
}

let todoList = getTodoListFromLocalStorage();

let todoCount = todoList.length;

saveBtnEl.onclick = function() {
    localStorage.setItem("myList", JSON.stringify(todoList));
};

function markasDone(labelId, todoId) {
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");

    let todoObjectIndex = todoList.findIndex(function(eachtodo) {
        let eachId = "todo" + eachtodo.uniqueNo;

        if (eachId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    let todoObject = todoList[todoObjectIndex];

    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }

}

function deletetodo(todoId) {
    let todoElement = document.getElementById(todoId);
    taskContainer.removeChild(todoElement);
    console.log(todoList);
    console.log(todoId);
    let deleteIndex = todoList.findIndex(function(eachtodo) {
        let eachId = "todo" + eachtodo.uniqueNo;

        if (eachId === todoId) {
            return true;
        } else {
            return false;
        }

    });
    todoList.splice(deleteIndex, 1);
}

function addtasks(todo) {
    let todoId = "todo" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let checkboxId = "checkbox" + todo.uniqueNo;

    let listEl = document.createElement("li");
    listEl.classList.add("d-flex", "flex-row", "task-container", "mb-3");
    listEl.id = todoId;
    taskContainer.appendChild(listEl);

    let inputEl = document.createElement("input");
    inputEl.type = "checkbox";
    inputEl.id = checkboxId;
    inputEl.checked = todo.isChecked;
    inputEl.classList.add("input-box");

    inputEl.onclick = function() {
        markasDone(labelId, todoId);
    };
    listEl.appendChild(inputEl);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    listEl.appendChild(labelContainer);

    let labelEl = document.createElement("label");
    labelEl.setAttribute("for", checkboxId);
    labelEl.classList.add("label-text");
    labelEl.textContent = todo.text;
    labelEl.id = labelId;
    if (todo.isChecked === true) {
        labelEl.classList.add("checked");
    }
    labelContainer.appendChild(labelEl);


    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");

    deleteIcon.onclick = function() {
        deletetodo(todoId);
    };
    deleteIconContainer.appendChild(deleteIcon);
}

for (let todo of todoList) {
    addtasks(todo);
}


function addnewtodo() {
    if (userInput.value === "") {
        alert("Enter Valid text");
    } else {
        let userInputVal = userInput.value;

        todoCount += 1;
        let newtodo = {
            text: userInputVal,
            uniqueNo: todoCount,
            isChecked: false
        };
        todoList.push(newtodo);
        addtasks(newtodo);
        userInput.value = "";
    }
}

addBtn.onclick = function() {
    addnewtodo();
}