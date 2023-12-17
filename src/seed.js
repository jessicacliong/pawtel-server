require('dotenv').config();

const mongoose = require('mongoose');
const { databaseConnect } = require('./database');

databaseConnect().then(async () => {

     console.log("Creating seed data!");

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
     });


     let newPuma = new Pet({
          name: "Puma",
          animalType: "dog",
          breed: "Chow-chow",
          colour: "brown",
          gender: "male",
          age: 2,
          favouriteToys: ["ball","squeaky toy","favourite blanket"],
          dietaryRequirements: ["none"],
          allergies: ["none"],
     })   

     await newPuma.save().then(() => {
          console.log("Puma is in the Database!")

     });

})