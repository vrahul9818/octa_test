// services/api.js

// Simulated API submission function
export const submitBookingData = (data) => {
    return new Promise((resolve, reject) => {
      // Simulate a network request
      setTimeout(() => {
        // Simulate success/failure of the request
        const success = true; // Change to false to simulate an error
  
        if (success) {
          console.log("Data submitted:", data); // Logging the submitted data
          resolve(); // Resolve the promise if successful
        } else {
          reject(new Error("Failed to submit booking data.")); // Reject if there's an error
        }
      }, 1000); // Simulate a 1 second network delay
    });
  };
  