const mongoose = require("mongoose");

const { Schema } = mongoose;

const TaskSchema = new Schema({
  title: String,
  description: String,
  date: Date,
  user_id: String,
  status: {
    type: String,
    enum: ["Done", "InProgress", "NotStarted"],
    default: "NotStarted",
  },
});

module.exports = TaskSchema;
