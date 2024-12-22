const addToDoBtn = document.querySelector(".add-todo");
const logOutBtn = document.querySelector("#logout");
const taskSubmitBtn = document.querySelector(".task-submit-button");
const taskCancelBtn = document.querySelector(".task-cancel-button");
const gitHubBtn = document.querySelector("#github");
const xBtn = document.querySelector("#x");

gitHubBtn.addEventListener("click", function () {
  window.open("https://github.com/Devanshrai2003", "_blank");
});

xBtn.addEventListener("click", function () {
  window.open("https://x.com/devanshrai2003", "_blank");
});

logOutBtn.addEventListener("click", async function () {
  const isGuest = localStorage.getItem("isGuest");
  const token = localStorage.getItem("token");

  if (isGuest === "true") {
    try {
      await axios.delete(
        "https://aspire-task-management.onrender.com/todos/delete-guest-tasks",
        {
          headers: {
            token: token,
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("isGuest");

  window.location.href = "/homepage.html";
});

addToDoBtn.addEventListener("click", function () {
  const overlay = document.querySelector(".overlay-container");
  overlay.classList.toggle("show");
});

taskCancelBtn.addEventListener("click", function () {
  const overlay = document.querySelector(".overlay-container");
  overlay.classList.toggle("show");
});

taskSubmitBtn.addEventListener("click", async function () {
  const overlay = document.querySelector(".overlay-container");

  const taskData = {
    title: document.querySelector("#task-title").value,
    content: document.querySelector("#task-content").value,
    priority: document.querySelector("#task-priority").value,
    status: document.querySelector("#task-status").value,
    deadline: document.querySelector("#task-deadline").value,
    category: document.querySelector("#task-category").value,
  };

  if (
    !taskData.title ||
    !taskData.priority ||
    !taskData.status ||
    !taskData.deadline ||
    !taskData.category
  ) {
    alert("Please fill out all fields before submitting the task.");
    return;
  }

  overlay.classList.toggle("show");

  const token = localStorage.getItem("token");

  const taskId = taskSubmitBtn.getAttribute("data-task-id");

  if (taskId) {
    try {
      const response = await axios.put(
        `https://aspire-task-management.onrender.com/todos/edit-todo/${encodeURIComponent(
          taskId
        )}`,
        taskData,
        {
          headers: {
            token: token,
          },
        }
      );

      fetchTodos();
    } catch (error) {
      console.error("Error editing task:", error);
    }

    taskSubmitBtn.removeAttribute("data-task-id");
  } else {
    try {
      const response = await axios.post(
        "https://aspire-task-management.onrender.com/todos/add-todo",
        taskData,
        {
          headers: {
            token: token,
          },
        }
      );

      fetchTodos();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  }
  clearTaskForm();
});

window.onload = function () {
  fetchTodos();
};

async function fetchTodos() {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(
      "https://aspire-task-management.onrender.com/todos/all",
      {
        headers: {
          token: token,
        },
      }
    );
    const tasks = response.data.tasks;

    displayTodos(tasks);
  } catch (error) {
    console.error(error);
    alert("Failed to load tasks");
  }
}

function checkAndHideInstructions(container) {
  const instructions = container.previousElementSibling;
  if (container.childElementCount > 0 && instructions) {
    instructions.style.display = "none";
  } else {
    instructions.style.display = "block";
  }
}

function editTask(task) {
  const overlay = document.querySelector(".overlay-container");
  overlay.classList.toggle("show");

  document.querySelector("#task-title").value = task.title;
  document.querySelector("#task-content").value = task.content;
  document.querySelector("#task-priority").value = task.priority;
  document.querySelector("#task-status").value = task.status;
  document.querySelector("#task-deadline").value = new Date(task.deadline)
    .toISOString()
    .split("T")[0]; // format the date correctly
  document.querySelector("#task-category").value = task.category;

  taskSubmitBtn.setAttribute("data-task-id", task._id);
}

async function deleteTask(taskId) {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.delete(
      `https://aspire-task-management.onrender.com/todos/delete-todo/${taskId}`,
      {
        headers: {
          token: token,
        },
      }
    );
    if (response.status === 200) {
      fetchTodos();
    }
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}

function clearTaskForm() {
  document.querySelector("#task-title").value = "";
  document.querySelector("#task-content").value = "";
  document.querySelector("#task-priority").value = "";
  document.querySelector("#task-status").value = "";
  document.querySelector("#task-deadline").value = "";
  document.querySelector("#task-category").value = "";
  taskSubmitBtn.removeAttribute("data-task-id");
}

function displayTodos(tasks) {
  const notStartedContainer = document.querySelector("#not-started");
  notStartedContainer.innerHTML = "";
  const inProgressContainer = document.querySelector("#in-progress");
  inProgressContainer.innerHTML = "";
  const completedContainer = document.querySelector("#completed");
  completedContainer.innerHTML = "";

  tasks.forEach((task) => {
    const taskBox = document.createElement("div");
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
    statusBox.classList.add("status-box");

    const deadlineBox = document.createElement("div");
    deadlineBox.innerText = `Deadline: ${new Date(
      task.deadline
    ).toLocaleDateString()}`;

    const detailBoxTop = document.createElement("div");
    detailBoxTop.classList.add("detail-box-top");

    const detailBoxBottom = document.createElement("div");
    detailBoxBottom.classList.add("detail-box-bottom");

    const textBox = document.createElement("div");
    textBox.classList.add("text-box");

    const buttonBox = document.createElement("div");
    buttonBox.classList.add("button-box");

    const editButton = document.createElement("button");
    editButton.addEventListener("click", () => editTask(task));
    editButton.classList.add("task-button");
    editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;

    const deleteButton = document.createElement("button");
    deleteButton.addEventListener("click", () => deleteTask(task._id));
    deleteButton.classList.add("task-button");
    deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;

    buttonBox.appendChild(editButton);
    buttonBox.appendChild(deleteButton);

    detailBoxTop.appendChild(statusBox);
    detailBoxTop.appendChild(priorityBox);
    detailBoxBottom.appendChild(deadlineBox);
    detailBoxBottom.appendChild(categoryBox);

    textBox.appendChild(titleBox);
    textBox.appendChild(contentBox);

    taskBox.appendChild(detailBoxTop);
    taskBox.appendChild(textBox);
    taskBox.appendChild(detailBoxBottom);
    taskBox.appendChild(buttonBox);

    if (task.status === "not-started") {
      notStartedContainer.appendChild(taskBox);
      checkAndHideInstructions(notStartedContainer);
      statusBox.style.backgroundColor = "#870101";
    } else if (task.status === "in-progress") {
      inProgressContainer.appendChild(taskBox);
      checkAndHideInstructions(inProgressContainer);
      statusBox.style.backgroundColor = "#002745";
    } else if (task.status === "completed") {
      completedContainer.appendChild(taskBox);
      checkAndHideInstructions(inProgressContainer);
      statusBox.style.backgroundColor = "#075714";
    }

    if (task.priority === "low") {
      priorityBox.style.backgroundColor = "#018079";
    } else if (task.priority === "medium") {
      priorityBox.style.backgroundColor = "#027046";
    } else if (task.priority === "high") {
      priorityBox.style.backgroundColor = "#00422a";
    }
  });
}
