import mongoose from "mongoose";

const { Schema } = mongoose;

const ProjectSchema = new Schema({
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  messages:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
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
  color: {
    type: String,
    default: "#f00",
  },
});

export default ProjectSchema;
