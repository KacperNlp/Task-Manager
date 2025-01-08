const mongoose = require("mongoose");
const TaskSchema = require("../schema/TaskSchema");

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
