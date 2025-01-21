const express = require("express");
const router = express.Router();

const Comment = require("../models/Comment");

router.get("/all/:taskId", async (req, res) => {
  try {
    const comments = await Comment.find({ taskId: req.params.taskId });

    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/add", async (req, res) => {
  try {
    const commentData = { ...req.body, userId: req.cookies.user_id };
    const comment = new Comment(commentData);
    const savedComment = await comment.save();

    res.json(savedComment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
