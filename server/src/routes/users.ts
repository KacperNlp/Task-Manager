import express from 'express';
import {
    registerUser,
    loginUser,
    logoutUser,
    getAllUsers,
    getAllUsersNotAssignedToProject,
    getLoggedUser,
    updateUser,
    updateUserPassword,
} from '../controllers/usersController';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/users/all/:projectId', getAllUsers);
router.get('/users/all/not-assigned/:projectId', getAllUsersNotAssignedToProject);
router.get('/users/logged', getLoggedUser);
router.put('/users/logged/update', updateUser);
router.put('/users/logged/update/password', updateUserPassword);

export default router;
