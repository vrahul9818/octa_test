const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    wheels: {
        type: Number,
        required: true,
    },
    bookings: [
        {
            startDate: {
                type: String,
                required: true,
            },
            endDate: {
                type: String,
                required: true,
            }
        }
    ]
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
