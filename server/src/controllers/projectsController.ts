import Project from '../models/Project';
import User from '../models/User';
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

async function addUserToProject(req: Request, res: Response) {
    try {
        const { userId } = req.body;
        const { projectId } = req.params;

        console.log(req.body);
        console.log(userId, projectId);

        const user = await User.findById(userId);
        const project = await Project.findById(projectId);

        if (!user || !project) {
            return res.status(404).json({ message: 'User or project not found' });
        }

        if (project.users.includes(userId)) {
            return res.status(400).json({ message: 'User is already assigned to this project' });
        }

        project.users.push(userId);
        await project.save();

        res.status(200).json({ message: 'User added to project' });
    } catch (err) {
        return handleError(res, err);
    }
}

export { createProject, getProjects, addUserToProject };
