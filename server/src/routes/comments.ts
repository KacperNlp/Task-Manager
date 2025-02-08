import express from "express";
import Comment from "../models/Comment";
import { handleError } from "../utils/errorHandler";
import type { Request, Response } from "express";

const router = express.Router();

interface TaskParams  {
  taskId: string
}

router.get("/all/:taskId", async (req: Request<TaskParams>, res: Response) => {
  try {
    const comments = await Comment.find({ taskId: req.params.taskId }).populate(
      "user",
      "email"
    );

    res.json(comments);
  } catch (err) {
    return handleError(res, err);
  }
});

router.post("/add", async (req: Request, res: Response) => {
  try {
    const commentData = { ...req.body, user: req.cookies.user_id };
    const comment = new Comment(commentData);
    const savedComment = await comment.save();

    res.json(savedComment);
  } catch (err) {
    return handleError(res, err);
  }
});

export default router;
