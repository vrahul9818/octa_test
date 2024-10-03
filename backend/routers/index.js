const express = require('express');
const router = express.Router();

const { getVehicles } = require('./Controllers/VehicleInput');
const { addBooking } = require('./Controllers/BookingInput');
const { GetVehicleId } = require('./Controllers/GetVehicleId');

router.get('/bookings/GetVehicleId', GetVehicleId);
router.post('/bookings/add-booking', addBooking);
router.get('/getvehicles', getVehicles);

module.exports = router;
