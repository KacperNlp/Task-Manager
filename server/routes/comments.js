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

module.exports = router;
