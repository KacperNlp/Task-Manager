const express = require("express");
const router = express.Router();
const moment = require("moment");
const Task = require("../models/Task");

router.get("/", async (req, res) => {
  try {
    const todayStart = moment().startOf("day").toDate();
    const todayEnd = moment().endOf("day").toDate();

    const todayTasks = await Task.find({
      user_id: req.cookies.user_id,
      date: { $gte: todayStart, $lte: todayEnd },
    });

    const oldTasks = await Task.find({
      user_id: req.cookies.user_id,
      date: { $lt: todayStart },
    });

    res.json({ todayTasks, oldTasks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/add", async (req, res) => {
  try {
    const taskData = { ...req.body, user_id: req.cookies.user_id };
    const task = new Task(taskData);
    const savedTask = await task.save();
    res.json(savedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully", deletedTask: task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/status/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (task.status === "NotStarted") task.status = "InProgress";
    else if (task.status === "InProgress") task.status = "Done";

    await task.save();

    res.json({
      message: "Task status updated successfully",
      updatedTask: task,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
