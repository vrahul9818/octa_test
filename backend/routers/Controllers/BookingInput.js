const express = require('express');
const Booking = require('../../models/Booking');
const Vehicle = require('../../models/Vehicle');

const addBooking = async (req, res) => {
    const { firstName, lastName, dateRange, wheels, id: vehicleId } = req.body;

    if (!firstName || !lastName || !vehicleId || !dateRange) {
        return res.status(400).json({ message: 'User, vehicle, start date, and end date are required' });
    }

    try {
        const newBooking = new Booking({
            firstName,
            lastName,
            wheels,
            vehicleId,
            dateRange,
        });
        await newBooking.save();

        const vehicle = await Vehicle.findById(vehicleId);
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        vehicle.bookings.push({
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
        });
        await vehicle.save(); 

        const allBookings = await Booking.find({ vehicleId }); // Fetch bookings for the 
        console.log(allBookings);

        res.status(201).json({ 
            message: 'Booking created successfully', 
            booking:  
            allBookings 
        });
    } catch (error) {
        console.error('Error adding booking:', error); 
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { addBooking };
