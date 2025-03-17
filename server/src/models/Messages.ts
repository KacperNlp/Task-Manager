import mongoose from "mongoose";
import MessageSchema from "../schema/MessagesSchema";   

const Message = mongoose.model("Message", MessageSchema);   

export default Message;