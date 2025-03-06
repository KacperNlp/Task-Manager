import express from "express";
import Comment from "../models/Comment";
import Task from "../models/Task";
import { handleError } from "../utils/errorHandler";
import type { Request, Response } from "express";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({
      // user_id: req.cookies.user_id,
      projectId: req.query.projectId,
    });

    const tasksWithComments =  await Promise.all(
      tasks.map(async (task) => {
        const numberOfComments = (await Comment.find({
          taskId: task._id
        })).length

        return {...task.toObject(), numberOfComments};
      })
    );

    res.json(tasksWithComments);
  } catch (err) {
    return handleError(res, err);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);

    res.json(task);
  } catch (err) {
    return handleError(res, err);
  }
});

router.post("/add", async (req: Request, res: Response) => {
  try {
    const taskData = { ...req.body, user_id: req.cookies.user_id };
    const task = new Task(taskData);
    const savedTask = await task.save();
    res.json(savedTask);
  } catch (err) {
    return handleError(res, err);
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully", deletedTask: task });
  } catch (err) {
    return handleError(res, err);
  }
});

router.put("/status/:id", async (req: Request, res: Response) => {
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
    return handleError(res, err);
  }
});

export default router;
