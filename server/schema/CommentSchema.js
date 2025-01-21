const mongoose = require("mongoose");

const { Schema } = mongoose;

const CommentSchema = new Schema({
  taskId: String,
  userId: String,
  date: Date,
  content: String,
});

module.exports = CommentSchema;
