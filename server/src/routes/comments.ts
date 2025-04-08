import express from 'express';
import Comment from '../models/Comment';
import { handleError } from '../utils/errorHandler';
import { getComments, addComment } from '../controllers/commentsController';
import type { Request, Response } from 'express';

const router = express.Router();

interface TaskParams {
    taskId: string;
}

router.get('/all/:taskId', getComments);

router.post('/add', addComment);

export default router;
