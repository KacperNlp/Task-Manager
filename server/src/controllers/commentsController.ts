import Comment from '../models/Comment';
import { handleError } from '../utils/errorHandler';
import type { Request, Response } from 'express';

interface TaskParams {
    taskId: string;
}

async function getComments(req: Request<TaskParams>, res: Response) {
    try {
        const comments = await Comment.find({ taskId: req.params.taskId }).populate(
            'user',
            'email'
        );

        res.json(comments);
    } catch (err) {
        return handleError(res, err);
    }
}

async function addComment(req: Request, res: Response) {
    try {
        const commentData = { ...req.body, user: req.cookies.user_id };
        const comment = new Comment(commentData);
        const savedComment = await comment.save();

        res.json(savedComment);
    } catch (err) {
        return handleError(res, err);
    }
}

export { getComments, addComment };
