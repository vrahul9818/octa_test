const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    wheels: {
        type: String,
        required: true,
    },
    vehicleId: { 
        type: String, 
        required: true 
    }, 
    dateRange: {
        startDate: {
            type: String, 
            required: true,
        },
        endDate: {
            type: String, 
            required: true,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now, 
    },
});


module.exports = mongoose.model('Booking', bookingSchema);
