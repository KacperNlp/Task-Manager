const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProjectSchema = new Schema({
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
  },
  users: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = ProjectSchema;
