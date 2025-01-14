const mongoose = require("mongoose");

const { Schema } = mongoose;

const TaskSchema = new Schema({
  title: String,
  description: String,
  user_id: String,
});

module.exports = TaskSchema;
