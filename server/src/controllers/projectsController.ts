import Project from '../models/Project';
import { handleError } from '../utils/errorHandler';
import type { Request, Response } from 'express';

async function createProject(req: Request, res: Response) {
    try {
        const projectData = { ...req.body, user: req.cookies.user_id };
        const project = new Project(projectData);
        await project.save();

        res.status(200).json({ message: 'Project created' });
    } catch (err) {
        return handleError(res, err);
    }
}

async function getProjects(req: Request, res: Response) {
    try {
        const projects = await Project.find({ users: req.cookies.user_id });

        res.json(projects);
    } catch (err) {
        return handleError(res, err);
    }
}

export { createProject, getProjects };
