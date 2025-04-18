import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Project from '../models/Project';
import { handleError } from '../utils/errorHandler';
import type { Request, Response } from 'express';

async function registerUser(req: Request, res: Response) {
    try {
        const { email, name, surname, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            email,
            name,
            surname,
            password: hashedPassword,
            role,
        });
        user.save();

        const JWT_SECRET = process.env.JWT_SECRET || 'secret';

        const token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET, {
            expiresIn: '12h',
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
        });

        res.cookie('user_id', user._id, {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
        });

        return res.status(200).json({ success: true, message: 'User registered' });
    } catch (err) {
        return handleError(res, err);
    }
}

async function loginUser(req: Request, res: Response) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User not found!' });
        }

        if (!(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const JWT_SECRET = process.env.JWT_SECRET || 'secret';

        const token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET, {
            expiresIn: '12h',
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
        });

        res.cookie('user_id', user._id, {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
        });

        return res.status(200).json({ success: true, message: 'User logged in' });
    } catch (err) {
        return handleError(res, err);
    }
}

function logoutUser(req: Request, res: Response) {
    res.clearCookie('token');
    res.clearCookie('user_id');
    res.json({ message: 'User logged out successfully' });
}

async function getAllUsers(req: Request, res: Response) {
    try {
        const { projectId } = req.params;
        let users;

        if (projectId !== 'null') {
            const project = await Project.findById(projectId).populate(
                'users',
                'name surname role _id'
            );

            if (!project) return res.status(404).json({ message: 'Project not found!' });

            users = project.users;
        } else {
            users = await User.find().select('name surname role _id');
        }

        res.status(200).json(users);
    } catch (err) {
        return handleError(res, err);
    }
}

async function getAllUsersNotAssignedToProject(req: Request, res: Response) {
    try {
        const { projectId } = req.params;
        const project = await Project.findById(projectId).select('users');

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const users = await User.find({ _id: { $nin: project.users } }).select(
            'name surname role _id'
        );

        res.status(200).json(users);
    } catch (err) {
        return handleError(res, err);
    }
}

async function getLoggedUser(req: Request, res: Response) {
    try {
        const loggedUser = await User.findById(req.cookies.user_id).select('-password');

        res.status(200).json(loggedUser);
    } catch (err) {
        return handleError(res, err);
    }
}

async function updateUser(req: Request, res: Response) {
    try {
        const { name, surname, email } = req.body;
        const user = await User.findById(req.cookies.user_id);
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        user.name = name;
        user.surname = surname;
        user.email = email;

        await user.save();

        res.status(200).json({ message: 'User updated successfully' });
    } catch (err) {
        return handleError(res, err);
    }
}

async function updateUserPassword(req: Request, res: Response) {
    try {
        const { password } = req.body;
        const user = await User.findById(req.cookies.user_id);
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        user.password = await bcrypt.hash(password, 10);
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (err) {
        return handleError(res, err);
    }
}

export {
    registerUser,
    loginUser,
    logoutUser,
    getAllUsers,
    getAllUsersNotAssignedToProject,
    getLoggedUser,
    updateUser,
    updateUserPassword,
};
