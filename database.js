const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const UserSchema = new Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
});

const TodoSchema = new Schema({
  userId: { type: ObjectId, ref: "user" },
  title: String,
  content: String,
  category: String,
  status: String,
  deadline: Date,
  priority: String,
});

const UserModel = mongoose.model("user", UserSchema);
const TodoModel = mongoose.model("todo", TodoSchema);

module.exports = {
  UserModel,
  TodoModel,
};
