const express = require("express");
const router = express.Router();

const Project = require("../models/Project");

router.post("/", async (req, res) => {
  try {
    const commentData = { ...req.body, user: req.cookies.user_id };
    const comment = new Comment(commentData);
    const savedComment = await comment.save();

    res.json(savedComment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
