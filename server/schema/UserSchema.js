const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: [
      "Project Manager",
      "Backend Developer",
      "Frontend Developer",
      "Tester",
      "Designer",
    ],
    default: "Project Manager",
  },
});

module.exports = UserSchema;
