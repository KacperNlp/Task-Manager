const { text } = require("express");
const mongoose = require("mongoose");

const { Schema } = mongoose;

const CommentSchema = new Schema({
  taskId: String,
  userId: String,
  date: Date,
  text: String,
});

module.exports = CommentSchema;
