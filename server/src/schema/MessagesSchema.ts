import mongoose from "mongoose";

const { Schema } = mongoose;

const MessageSchema = new Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true }, 
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    date: { type: Date, default: Date.now },
    text: { type: String, required: true },   
});

export default MessageSchema;