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

todosRouter.get("/all", async function(req, res){
    try{
        const tasks = await TodoModel.find()
        res.json({
            success: true,
            tasks: tasks
        })

    }catch(error){
        console.error(error)
    }

})

todosRouter.post("/add-todo", async function(req, res){

    try{
        const{title, userId, content, priority, status, deadline, category} = req.body

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

module.exports = {
    todosRouter: todosRouter,
}