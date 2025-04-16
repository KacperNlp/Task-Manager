import express from 'express';
import { createProject, getProjects, addUserToProject } from '../controllers/projectsController';

const router = express.Router();

router.post('/', createProject);
router.get('/', getProjects);
router.put('/:projectId/users', addUserToProject);

export default router;
