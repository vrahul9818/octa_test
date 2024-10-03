const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://vrahul9818:e3CrckFD7834Z4HJ@octatest1.8cu0n.mongodb.net/?retryWrites=true&w=majority&appName=octaTest1
`);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
