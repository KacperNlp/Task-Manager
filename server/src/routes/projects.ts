import express from "express";
import Project from "../models/Project";
import type { Request, Response } from "express";

const router = express.Router();


router.post("/", async (req: Request, res: Response) => {
  try {
    const projectData = { ...req.body, user: req.cookies.user_id };
    const project = new Project(projectData);
    await project.save();

    res.status(200).json({ message: "Project created" });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";

    res.status(500).json({ error: errorMessage });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const projects = await Project.find({ users: req.cookies.user_id });

    res.json(projects);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";

    res.status(500).json({ error: errorMessage });
  }
});

export default router;
