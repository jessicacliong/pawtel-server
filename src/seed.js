const mongoose = require('mongoose');
const { databaseConnect } = require('./database');
const { Pet } = require('./models/PetModel');
const { User } = require('./models/UserModel');
const { Booking } = require('./models/BookingModel');
const { Room } = require('./models/RoomModel');

require('dotenv').config();
dotenv.config();


let newUser = await User.create({
     firstName: "John",
     lastName: "Smith",
     email: "johnsmith@example.com",
     username: "johnsmith",
     password: "john12345",
});


databaseConnect().then(async () => {

     console.log("Creating seed data!");





     // let newPet = await Pet.create({
     //      name: "Puma",
     //      animalType: "dog",
     //      breed: "Chow-chow",
     //      colour: "brown",
     //      gender: "male",
     //      age: 2,
     //      favouriteToys: ["ball","squeaky toy","favourite blanket"],
     //      dietaryRequirements: ["none"],
     //      allergies: ["none"],
     //      user: newUser._id
     // });


     // let newBooking = await Booking.create({
     //      startDate: new Date('2023-01-01T09:00:00Z'),
     //      endDate: new Date('2023-01-10T09:00:00Z'),
     //      pet: newPet._id
     // });


     // let newRoom = await Room.create({
     //      roomType: "Standard"
     // });

          console.log(`New Data created.\n + JSON.stringify({users: userCreated},)`);

}).then(async () => {
     await mongoose.connection.close();
     console.log("Database disconnected!");

})