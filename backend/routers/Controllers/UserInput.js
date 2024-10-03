const express = require('express');
const User = require('../../models/User');

// Define the addUser function
const addUser = async (req, res) => {
    const { first_name, last_name } = req.body;
    if (!first_name || !last_name) {
        return res.status(400).json({ message: 'First name and last name are required' });
    }
    try {
        const newUser = new User({ first_name, last_name });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
module.exports = { addUser };
