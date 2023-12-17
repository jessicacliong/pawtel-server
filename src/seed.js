require('dotenv').config();

const mongoose = require('mongoose');
const { databaseConnect } = require('./database');
const { Pet } = require('./models/PetModel');
const { User } = require('./models/UserModel');
const { Booking } = require('./models/BookingModel');

databaseConnect().then(async () => {

     console.log("Creating seed data!");

     /* User Model

     const User = mongoose.model(`User`, {
     name: String,
     address: String,
     city: String,
     postcode: Number,
     email: String,
     username: String,
     password: String,
     */

     let newUser = new User({
          firstname: "John",
          lastname: "Smith",
          address: "123 Main St",
          city: "Australia",
          postcode: "3000",
          email: "johnsmith@example.com",
          username: "john",
          password: "john123"
     })

     await newUser.save().then(() => {
          console.log(`${newUser.firstname} ${newUser.lastname} is in the DB`);

     });

     /*   Pet Model
     
     const Pet = mongoose.model(`Pet`, {
          name: String,
          animalType: String,
          breed: String,
          colour: String,
          gender: String,
          age: Number,
          favouriteToys: [String],
          dietaryRequirements: [String],
          allergies: [String],
     }); */

     // let newPet = new Pet({
     //      name: "Puma",
     //      animalType: "dog",
     //      breed: "Chow-chow",
     //      colour: "brown",
     //      gender: "male",
     //      age: 2,
     //      favouriteToys: ["ball","squeaky toy","favourite blanket"],
     //      dietaryRequirements: ["none"],
     //      allergies: ["none"],
     // })   

     // await newPet.save().then(() => {
     //      console.log(`${newPet.name} is in the DB`);

     // });


     /* Booking Model
     
     const Booking = mongoose.model(`Booking`, {
     roomType: String,
     startDate: Date,
     endDate: Date

     */

     // let newBooking = new Booking({
     //      roomType: "Standard",
     //      startDate: 2023-5-20,
     //      endDate: 2023-5-27,
     // })

     // await newBooking.save().then(() => {
     //      console.log(`${newBooking.name}`)
     // });



}).then(async () => {
     await mongoose.connection.close();
     console.log("Database disconnected!");
})