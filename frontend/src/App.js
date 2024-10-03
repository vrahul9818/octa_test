import React, { useState } from 'react';
import '../src/App.css'; 
import NameStep from './components/NameStep';
import WheelsStep from './components/WheelsStep';
import VehicleTypeStep from './components/VehicleTypeStep';
import DateRangeStep from './components/DateRangeStep';
import BookingHistoryStep from './components/BookingHistoryStep'; // Import the new component
import { submitBookingData } from './services/api';

const App = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    wheels: '',
    id: '',
    model: '',
    dateRange: { startDate: '', endDate: '' }
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleDataChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    submitBookingData(formData)
      .then(() => {
        alert(`Booking submitted successfully! ${formData.dateRange.startDate} to ${formData.dateRange.endDate}`);
        setStep(5); 
      })
      .catch((err) => console.error("Error submitting booking: ", err));     
  };

  return (
    <div className="app-container"> {/* Use the CSS class here */}
      {step === 1 && (
        <NameStep nextStep={nextStep} handleDataChange={handleDataChange} formData={formData} />
      )}
      {step === 2 && (
        <WheelsStep nextStep={nextStep} prevStep={prevStep} handleDataChange={handleDataChange} formData={formData} />
      )}
      {step === 3 && (
        <VehicleTypeStep nextStep={nextStep} prevStep={prevStep} handleDataChange={handleDataChange} formData={formData} />
      )}
      {step === 4 && (
        <DateRangeStep handleSubmit={handleSubmit} prevStep={prevStep} handleDataChange={handleDataChange} formData={formData} />
      )}
      {step === 5 && ( // New step for booking history
        <BookingHistoryStep handleSubmit={handleSubmit} prevStep={prevStep} handleDataChange={handleDataChange} formData={formData} />
      )}
    </div>
  );
};

export default App;
