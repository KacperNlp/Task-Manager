const mongoose = require("mongoose");

const { Schema } = mongoose;

const TaskSchema = new Schema({
  title: String,
  description: String,
  date: Date,
  user_id: String,
  projectId: String,
  status: {
    type: String,
    enum: ["Done", "InProgress", "NotStarted"],
    default: "NotStarted",
  },
  taskType: {
    type: String,
    enum: ["Low", "Medium", "Hight"],
    default: "Low",
  },
});

module.exports = TaskSchema;
