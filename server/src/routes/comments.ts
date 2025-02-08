import express from "express";
import Comment from "../models/Comment";
import type { Request, Response, Router } from "express";

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
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";

    res.status(500).json({ error: errorMessage });
  }
});

router.post("/add", async (req: Request, res: Response) => {
  try {
    const commentData = { ...req.body, user: req.cookies.user_id };
    const comment = new Comment(commentData);
    const savedComment = await comment.save();

    res.json(savedComment);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";

    res.status(500).json({ error: errorMessage });
  }
});

export default router;
