const express = require('express');
const Vehicle = require('../../models/Vehicle');

const GetVehicleId = async (req, res) => {
    try {
        const { id } = req.query; 
         let vehicles = await Vehicle.find({_id: id });   
         console.log(id,vehicles);   
        res.status(200).json(vehicles); 
    } catch (error) {
        console.error('Error fetching vehicles:', error.message); 
        res.status(500).json({ message: 'Failed to fetch vehicles' });
    }
};

module.exports = { GetVehicleId };
