import React, { useEffect, useState } from 'react';
import { Typography, Button } from '@mui/material';
import '../components/css/NameStep.css';

const BookingHistoryStep = ({ prevStep, formData }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    console.log(formData, "formData");

    const handleBooking = async () => {
      setSubmitting(true);
      try {
        const response = await fetch('http://localhost:5000/api/bookings/add-booking', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Failed to submit booking');
        }
        const data = await response.json();   
        console.log(data.booking);     
        setHistory(data.booking); 
      } catch (err) {
        setError(err.message || 'Failed to process booking');
      } finally {
        setSubmitting(false);
        setLoading(false);
      }
    };

    handleBooking();
  }, [formData]);

  if (loading || submitting) {
    return <Typography>Loading booking history...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div className='book-step-container'>
      <Typography variant="h4" gutterBottom>
        Your Booking History
      </Typography>
      {history.length > 0 ? (
        <ul>
          {history.map((booking, index) => (
            <li key={index}>
              {booking.firstName} {booking.lastName} - {booking.model} from {booking.dateRange.startDate} to {booking.dateRange.endDate}
            </li>
          ))}
        </ul>
      ) : (
        <Typography>No booking history available.</Typography>
      )}
      <div className='button-container'>
        <Button variant="contained" color="primary" onClick={prevStep}>
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default BookingHistoryStep;
