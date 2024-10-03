const express = require('express');
const Vehicle = require('../../models/Vehicle');

const getVehicles = async (req, res) => {
    try {
        const { wheels } = req.query; 
        let vehicles;
        console.log("Fetching vehicles from the database...");
    
         vehicles = await Vehicle.find(); 
        if (wheels) {
            // Convert wheels parameter to number for comparison
            const wheelsNumber = parseInt(wheels, 10);
            vehicles = vehicles.filter(vehicle => vehicle.wheels === wheelsNumber); 
        }
        res.status(200).json(vehicles); 
    } catch (error) {
        console.error('Error fetching vehicles:', error.message); 
        res.status(500).json({ message: 'Failed to fetch vehicles' });
    }
};

module.exports = { getVehicles };
