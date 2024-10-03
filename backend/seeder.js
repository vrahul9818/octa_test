const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');
const Vehicle = require('./models/Vehicle');

dotenv.config();

const vehicles = [
    // Cars
    { type: "Hatchback", model: "Volkswagen Golf", wheels: 4 },
    { type: "SUV", model: "Toyota Highlander", wheels: 4 },
    { type: "Sedan", model: "Honda Accord", wheels: 4 },
    { type: "SUV", model: "Ford Explorer", wheels: 4 },
    { type: "Sedan", model: "Tesla Model S", wheels: 4 },
    { type: "Hatchback", model: "Hyundai i20", wheels: 4 },
    { type: "SUV", model: "BMW X5", wheels: 4 },
    { type: "Sedan", model: "Audi A4", wheels: 4 },
    { type: "Hatchback", model: "Ford Fiesta", wheels: 4 },
    { type: "SUV", model: "Jeep Wrangler", wheels: 4 },
  
    // Bikes
    { type: "Cruiser", model: "Harley-Davidson Sportster", wheels: 2 },
    { type: "Sports", model: "Yamaha YZF R1", wheels: 2 },
    { type: "Cruiser", model: "Royal Enfield Classic 350", wheels: 2 },
    { type: "Sports", model: "Kawasaki Ninja ZX-10R", wheels: 2 },
    { type: "Cruiser", model: "Honda Rebel 500", wheels: 2 }
  ];
const seedDatabase = async () => {
    
    console.log(process.env.MONGODB_URI)
    await mongoose.connect(process.env.MONGODB_URI);
    await User.deleteMany({});
    await Vehicle.deleteMany({});
console.log("in seed")
    // Seed users
    try {
        await Vehicle.deleteMany({});
        await Vehicle.insertMany(vehicles);
        console.log("Vehicles seeded successfully!");
        mongoose.connection.close();
      } catch (error) {
        console.error("Error seeding vehicles:", error);
        mongoose.connection.close();
      }

    console.log('Database seeded!');
    mongoose.connection.close();
};

seedDatabase().catch(err => {
    console.error(err);
    mongoose.connection.close();
});
