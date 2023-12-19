require('dotenv').config();

const mongoose = require('mongoose');
const { databaseConnect } = require('./database');
const { Pet } = require('./models/PetModel');
const { User } = require('./models/UserModel');
const { Booking } = require('./models/BookingModel');

databaseConnect().then(async () => {

     console.log("Creating seed data!");

     let newUser = await User.create({
          firstName: "John",
          lastName: "Smith",
          email: "johnsmith@example.com",
          username: "johnsmith",
          password: "john12345",
     });

     let newPet = await Pet.create({
          name: "Puma",
          animalType: "dog",
          breed: "Chow-chow",
          colour: "brown",
          gender: "male",
          age: 2,
          favouriteToys: ["ball","squeaky toy","favourite blanket"],
          dietaryRequirements: ["none"],
          allergies: ["none"],
          user: newUser._id
     });


     let newBooking = await Booking.create({
          roomType: "Standard",
          startDate: new Date('2023-01-01T09:00:00Z'),
          endDate:  new Date('2023-01-10T09:00:00Z')
     });

          console.log(`${newBooking.roomType} room booking is in the DB`);

}).then(async () => {
     await mongoose.connection.close();
     console.log("Database disconnected!");

})