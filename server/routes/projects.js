const express = require("express");
const router = express.Router();

const Project = require("../models/Project");

router.post("/", async (req, res) => {
  try {
    const projectData = { ...req.body, user: req.cookies.user_id };
    const project = new Project(projectData);
    await project.save();

    res.status(200).json({ message: "Project created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
