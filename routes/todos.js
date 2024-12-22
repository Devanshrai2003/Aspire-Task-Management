const { Router } = require("express");
const { TodoModel } = require("../database");
const { UserModel } = require("../database");
const { authenticator } = require("../middlewares/auth");

const todosRouter = Router();

todosRouter.get("/todo-page", authenticator, function (req, res) {
  res.json({
    message: "todo-page reached",
  });
});

todosRouter.get("/all", authenticator, async function (req, res) {
  const userId = req.userId;

  try {
    const tasks = await TodoModel.find({
      userId: userId,
    });
    res.json({
      success: true,
      tasks: tasks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to load tasks" });
  }
});

todosRouter.post("/add-todo", authenticator, async function (req, res) {
  const userId = req.userId;

  try {
    const { title, content, priority, status, deadline, category } = req.body;

    if (!title || !priority || !status || !deadline || !category) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    await TodoModel.create({
      userId: userId,
      title: title,
      content: content || "",
      priority: priority,
      status: status,
      deadline: new Date(deadline),
      category: category,
    });

    res.json({
      success: true,
      message: "task added successfully",
    });
  } catch (error) {
    console.error(error);
  }
});

todosRouter.put("/edit-todo/:id", authenticator, async function (req, res) {
  const { id } = req.params;
  const updatedTask = req.body;

  try {
    const task = await TodoModel.findByIdAndUpdate(id, updatedTask, {
      new: true,
    });
    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Failed to update task" });
  }
});

todosRouter.delete(
  "/delete-todo/:id",
  authenticator,
  async function (req, res) {
    const { id } = req.params;

    try {
      const deletedTask = await TodoModel.findByIdAndDelete(id);
      if (!deletedTask) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete task" });
    }
  }
);

todosRouter.delete("/delete-guest-tasks", authenticator, async (req, res) => {
  try {
    const guestUser = await UserModel.findOne({ username: "guest" });

    if (!guestUser) {
      return res.status(404).json({ message: "Guest user not found" });
    }

    await TodoModel.deleteMany({ userId: guestUser._id });

    res.status(200).json({ message: "Guest tasks deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete guest tasks",
      error: error,
    });
  }
});

module.exports = {
  todosRouter: todosRouter,
};
