import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Card, CardContent, CardMedia, FormControlLabel, Checkbox } from '@mui/material';
import Cruser from '../FontImage/Cruser.png';
import Hatchback from '../FontImage/Hatchback.png';
import Sedan from '../FontImage/Sedan.png';
import SUV from '../FontImage/SUV.png';
import Sports from '../FontImage/Sports.png';
import '../components/css/VehicleTypeStep.css'; 

const VehicleTypeStep = ({ nextStep, prevStep, handleDataChange, formData }) => {
  const [error, setError] = useState('');
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTypes, setSelectedTypes] = useState([]);

  useEffect(() => {
    const fetchVehicleTypes = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/getvehicles?wheels=${formData.wheels}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setVehicleTypes(data);
      } catch (error) {
        setError('Failed to fetch vehicle types');
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleTypes();
  }, [formData.wheels]); // Include any other dependencies as needed

  const handleCardClick = (id) => {
    handleDataChange('id', id);
    nextStep();
  };

  const vehicleOptions = formData.wheels === '2' ? ['Sports', 'Cruiser'] : ['SUV', 'Sedan', 'Hatchback'];

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setSelectedTypes(prevSelected =>
      prevSelected.includes(value)
        ? prevSelected.filter(type => type !== value)
        : [...prevSelected, value]
    );
  };

  const filteredVehicleTypes = selectedTypes.length > 0
    ? vehicleTypes.filter(type => selectedTypes.includes(type.type))
    : vehicleTypes;

  const vehicleImages = {
    Cruiser: Cruser,
    Hatchback: Hatchback,
    Sedan: Sedan,
    SUV: SUV,
    Sports: Sports,
  };

  return (
    <div className="vehicle-type-container">
      <Box>
        <Typography variant="h4" gutterBottom>
          Select Vehicle Type
        </Typography>

        <div className="vehicle-type-checkbox-container">
          {vehicleOptions.map((option, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={selectedTypes.includes(option)}
                  onChange={handleCheckboxChange}
                  value={option}
                />
              }
              label={option}
            />
          ))}
        </div>

        {loading ? (
          <Typography>Loading vehicle types...</Typography>
        ) : (
          <div className="vehicle-type-grid">
            {filteredVehicleTypes.length > 0 ? (
              filteredVehicleTypes.map((type) => (
                <Card
                  key={type._id}
                  className="vehicle-type-card"
                  onClick={() => handleCardClick(type._id)}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={vehicleImages[type.type] || 'path/to/fallback/image.png'} // Use fallback if needed
                    alt={type.model}
                    className="vehicle-type-card-img"
                  />
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {type.model}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Type: {type.type}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Wheels: {type.wheels}
                    </Typography>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography>No vehicle types available for the selected category.</Typography>
            )}
          </div>
        )}

        {error && <Typography color="error">{error}</Typography>}
      </Box>

      <Button variant="contained" color="secondary" onClick={prevStep} fullWidth>
        Back
      </Button>
    </div>
  );
};

export default VehicleTypeStep;
