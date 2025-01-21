const { text } = require("express");
const mongoose = require("mongoose");

const { Schema } = mongoose;

const CommentSchema = new Schema({
  taskId: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: Date,
  text: String,
});

module.exports = CommentSchema;
