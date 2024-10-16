const {Router} = require("express");
const {TodoModel} = require("../database");
const {UserModel} = require("../database");
const { authenticator } = require("../middlewares/auth");

const todosRouter = Router();

todosRouter.get("/todo-page",authenticator, function(req,res){
    res.json({
        message: "todo-page reached"
    })
})

todosRouter.get("/all", authenticator, async function(req, res){

    const userId = req.userId;

    try{
        const tasks = await TodoModel.find({
            userId: userId 
        })
        res.json({
            success: true,
            tasks: tasks
        })

    }catch(error){
        console.error(error)
        res.status(500).json({ message: "Failed to load tasks" });
    }

})

todosRouter.post("/add-todo", authenticator, async function(req, res){

    const userId = req.userId;

    try{
        const{title, content, priority, status, deadline, category} = req.body

        if (!title || !priority || !status || !deadline || !category) {
            return res.status(400).json({ 
                success: false,
                message: "All required fields must be filled"
            });
        }

        await TodoModel.create({
            userId: userId,
            title: title,
            content: content || "",
            priority: priority,
            status: status,
            deadline: new Date(deadline),
            category: category
        })

        res.json({
            success: true,
            message: "task added successfully"
        })
    }catch(error){
        console.error(error)
    }

})

todosRouter.post("/edit-todo", authenticator, async function(req, res){
    
})

module.exports = {
    todosRouter: todosRouter,
}