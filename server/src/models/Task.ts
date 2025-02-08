import mongoose from  "mongoose";
import TaskSchema from "../schema/TaskSchema";

const Task = mongoose.model("Task", TaskSchema);

export default Task;
