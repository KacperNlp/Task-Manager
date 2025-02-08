import mongoose from "mongoose";
import CommentSchema from "../schema/CommentSchema";

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
