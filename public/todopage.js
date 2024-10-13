
const addToDoBtn = document.querySelector(".add-todo");
const logOutBtn = document.querySelector("#logout");
const taskSubmitBtn = document.querySelector(".task-submit-button");
const taskCancelBtn = document.querySelector(".task-cancel-button");


logOutBtn.addEventListener("click", function(){
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    window.location.href = "/homepage.html"
})

addToDoBtn.addEventListener("click", function(){
    const overlay = document.querySelector(".overlay-container")
    overlay.classList.toggle("show")
})

taskCancelBtn.addEventListener("click", function(){
    const overlay = document.querySelector(".overlay-container")
    overlay.classList.toggle("show")
})

taskSubmitBtn.addEventListener("click", async function(){

    const userId = localStorage.getItem("userId");

    const overlay = document.querySelector(".overlay-container")
    overlay.classList.toggle("show")

 const taskData = {
 userId: userId,
 title : document.querySelector("#task-title").value,
 content : document.querySelector("#task-content").value,
 priority : document.querySelector("#task-priority").value,
 status : document.querySelector("#task-status").value,
 deadline : document.querySelector("#task-deadline").value,
 category : document.querySelector("#task-category").value,
 };

 try{

    const response =  await axios.post("http://localhost:3000/todos/add-todo", taskData)
    fetchTodos()

 }catch(error) {
    console.error(error)
 }
});

window.onload = function() {
    fetchTodos();
};

async function fetchTodos() {
    try {
        const response = await axios.get('http://localhost:3000/todos/all');
        const tasks = response.data.tasks;

        displayTodos(tasks);
    } catch (error) {
        console.error(error);
        alert("Failed to load tasks");
    }
}

function displayTodos(tasks){

    const notStartedContainer = document.querySelector("#not-started");
    notStartedContainer.innerHTML = "";
    const inProgressContainer = document.querySelector("#in-progress");
    inProgressContainer.innerHTML = "";
    const completedContainer = document.querySelector("#completed");
    completedContainer.innerHTML = "";

    tasks.forEach(task => {

        const taskBox = document.createElement("div")
        taskBox.classList.add("task-box");

        const titleBox = document.createElement("div");
        titleBox.innerText = task.title;
        titleBox.classList.add("title-box");

        const contentBox = document.createElement("div");
        contentBox.innerText = task.content;
        contentBox.classList.add("content-box");

        const categoryBox = document.createElement("div");
        categoryBox.innerText = `Category: ${task.category}`;

        const priorityBox = document.createElement("div");
        priorityBox.innerText = `Priority: ${task.priority}`;
        priorityBox.classList.add("priority-box");

        const statusBox = document.createElement("div");
        statusBox.innerText = `Status: ${task.status}`;
        statusBox.classList.add("status-box")

        const deadlineBox = document.createElement("div");
        deadlineBox.innerText = `Deadline: ${new Date(task.deadline).toLocaleDateString()}`;

        const detailBoxTop = document.createElement("div");
        detailBoxTop.classList.add("detail-box-top")

        const detailBoxBottom = document.createElement("div");
        detailBoxBottom.classList.add("detail-box-bottom")

        const textBox = document.createElement("div");
        textBox.classList.add("text-box")

        const buttonBox = document.createElement("div");
        buttonBox.classList.add("button-box");

        const editButton = document.createElement("button")
        editButton.classList.add("task-button")
        editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`

        const deleteButton = document.createElement("button")
        deleteButton.classList.add("task-button")
        deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`

        buttonBox.appendChild(editButton)
        buttonBox.appendChild(deleteButton)

        detailBoxTop.appendChild(statusBox)
        detailBoxTop.appendChild(priorityBox)
        detailBoxBottom.appendChild(deadlineBox)
        detailBoxBottom.appendChild(categoryBox)

        textBox.appendChild(titleBox)
        textBox.appendChild(contentBox)

        taskBox.appendChild(detailBoxTop)
        taskBox.appendChild(textBox)
        taskBox.appendChild(detailBoxBottom)
        taskBox.appendChild(buttonBox)

        if (task.status === "not-started") {

            notStartedContainer.appendChild(taskBox);
            statusBox.style.backgroundColor = "#870101"
            
        } else if (task.status === "in-progress") {

            inProgressContainer.appendChild(taskBox);
            statusBox.style.backgroundColor = "#002745"

        } else if (task.status === "completed") {

            completedContainer.appendChild(taskBox);
            statusBox.style.backgroundColor = "#075714"

        }

        if(task.priority === "low"){
            priorityBox.style.backgroundColor = "#018079"
        } else if(task.priority === "medium"){
            priorityBox.style.backgroundColor = "#027046"
        } else if(task.priority === "high"){
            priorityBox.style.backgroundColor = "#00422a"
        }
        
    });
}

