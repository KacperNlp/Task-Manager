const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ email, password: hashedPassword });
        user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {        
        res.status(500).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || (await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        }).json({ message: 'User logged in successfully' });
    } catch (err) {        
        res.status(500).json({ error: err.message });
    }  
});

router.post('/logout', (req, res) => {
    res.clearCookie('token').json({ message: 'User logged out successfully' });
});