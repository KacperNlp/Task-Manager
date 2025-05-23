import express from 'express';
import { WebSocket } from 'ws';

import Comment from '../models/Comment';
import Task from '../models/Task';
import Notification from '../models/Notification';
import Project from '../models/Project';

import { handleError } from '../utils/errorHandler';
import { userConnections } from '../websocket';

import type { Request, Response } from 'express';

const router = express.Router();

async function getTasks(req: Request, res: Response) {
    try {
        const tasks = await Task.find({
            projectId: req.query.projectId,
        }).populate('user_id', 'name surname email role');

        const tasksWithComments = await Promise.all(
            tasks.map(async task => {
                const numberOfComments = (
                    await Comment.find({
                        taskId: task._id,
                    })
                ).length;

                return { ...task.toObject(), numberOfComments };
            })
        );

        res.json(tasksWithComments);
    } catch (err) {
        return handleError(res, err);
    }
}

async function getTask(req: Request, res: Response) {
    try {
        const task = await Task.findById(req.params.id);

        res.json(task);
    } catch (err) {
        return handleError(res, err);
    }
}

async function getTasksByUser(req: Request, res: Response) {
    try {
        const tasks = await Task.find({
            user_id: req.params.id,
        });

        res.json(tasks);
    } catch (err) {
        return handleError(res, err);
    }
}

async function addTask(req: Request, res: Response) {
    try {
        const taskData = { ...req.body, user_id: req.body.userId };
        const task = new Task(taskData);
        const savedTask = await task.save();

        const project = await Project.findById(taskData.projectId).populate('users');
        if (!project) return res.status(404).json({ error: 'Project not found' });

        const notificationMessage = `New task "${savedTask.title}" created in ${project.name}`;

        const newNotification = await Notification.create({
            user: req.cookies.user_id,
            projectId: taskData.projectId,
            taskId: savedTask._id,
            message: notificationMessage,
        });

        const userSocket = userConnections.get(req.body.userId.toString());

        if (userSocket && userSocket.readyState === WebSocket.OPEN) {
            console.log(WebSocket.OPEN);
            userSocket.send(
                JSON.stringify({
                    type: 'notification',
                    data: {
                        _id: newNotification._id,
                        title: 'New task created',
                        message: notificationMessage,
                        projectId: taskData.projectId,
                        taskId: savedTask._id,
                    },
                })
            );
        }

        res.json(savedTask);
    } catch (err) {
        return handleError(res, err);
    }
}

async function deleteTask(req: Request, res: Response) {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json({ message: 'Task deleted successfully', deletedTask: task });
    } catch (err) {
        return handleError(res, err);
    }
}

async function updateTaskStatus(req: Request, res: Response) {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) return res.status(404).json({ message: 'Task not found' });

        let message = '';

        if (task.status === 'NotStarted') {
            task.status = 'InProgress';
            message = 'Task started';
        } else if (task.status === 'InProgress') {
            task.status = 'Done';
            message = 'Task completed';
        }

        await task.save();

        res.json({
            message,
            updatedTask: task,
        });
    } catch (err) {
        return handleError(res, err);
    }
}

export { getTasks, getTask, getTasksByUser, addTask, deleteTask, updateTaskStatus };
