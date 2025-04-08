import express from 'express';

import {
    getTasks,
    getTask,
    getTasksByUser,
    addTask,
    deleteTask,
    updateTaskStatus,
} from '../controllers/tasksController';

const router = express.Router();

router.get('/', getTasks);

router.get('/:id', getTask);

router.get('/user/:id', getTasksByUser);

router.post('/add', addTask);

router.delete('/:id', deleteTask);

router.put('/status/:id', updateTaskStatus);

export default router;
