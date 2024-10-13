const gitHubBtn = document.querySelector("#github");
const xBtn = document.querySelector("#x");
const signupBtn = document.querySelector("#signup");
const getStartedBtn = document.querySelector(".hero-button")
const loginBtn = document.querySelector("#login");


gitHubBtn.addEventListener("click", function(){
    window.open('https://github.com/Devanshrai2003', '_blank')
})

xBtn.addEventListener("click", function(){
    window.open('https://x.com/devanshrai2003', '_blank')
})

signupBtn.addEventListener("click", function() {
    window.location.href = "/signup.html"
})

getStartedBtn.addEventListener("click", async function() {
   
    const token = localStorage.getItem("token");

    if (!token) {
        alert("You are not logged in");
        window.location.href = "/signup.html";
        return;
    }

    try {
        await axios.get("http://localhost:3000/todos/todo-page", {
            headers: {
                token: token
            }
        });
        
        window.location.href = "/todopage.html"

    } catch (error) {
        console.error("Error fetching todos:", error);
        alert("You are not logged in");
        window.location.href = "/homepage.html";
    }
});

loginBtn.addEventListener("click", function() {
    window.location.href = "/login.html"
})