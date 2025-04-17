import express from 'express';
import {
    createProject,
    getProjects,
    getUsers,
    addUserToProject,
} from '../controllers/projectsController';

const router = express.Router();

router.post('/', createProject);
router.get('/', getProjects);
router.get('/:projectId/users', getUsers);
router.put('/:projectId/users', addUserToProject);

export default router;
