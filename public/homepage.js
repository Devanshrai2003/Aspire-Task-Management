const gitHubBtn = document.querySelector("#github");
const xBtn = document.querySelector("#x");
const signupBtn = document.querySelector("#signup");
const getStartedBtn = document.querySelector(".hero-button");
const loginBtn = document.querySelector("#login");

gitHubBtn.addEventListener("click", function () {
  window.open("https://github.com/Devanshrai2003", "_blank");
});

xBtn.addEventListener("click", function () {
  window.open("https://x.com/devanshrai2003", "_blank");
});

function checkUserLogin() {
  const token = localStorage.getItem("token");

  if (!token) {
    return false;
  } else {
    return true;
  }
}

async function getTodoPage() {
  const token = localStorage.getItem("token");

  try {
    await axios.get(
      "https://aspire-task-management.onrender.com/todos/todo-page",
      {
        headers: {
          token: token,
        },
      }
    );

    window.location.href = "/todopage.html";
  } catch (error) {
    console.error("Error fetching todos:", error);
    alert("Login Error");
    window.location.href = "/homepage.html";
  }
}

signupBtn.addEventListener("click", function () {
  if (checkUserLogin()) {
    getTodoPage();
  } else {
    window.location.href = "/signup.html";
  }
});

loginBtn.addEventListener("click", function () {
  if (checkUserLogin()) {
    getTodoPage();
  } else {
    window.location.href = "/login.html";
  }
});

getStartedBtn.addEventListener("click", function () {
  if (checkUserLogin()) {
    getTodoPage();
  } else {
    alert("you are not logged in");
    window.location.href = "/signup.html";
  }
});
