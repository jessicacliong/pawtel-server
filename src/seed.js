const mongoose = require('mongoose');
const { databaseConnect } = require('./database');

//const { databaseConnector } = require('./database');
const { Pet } = require('./models/PetModel');
const { User } = require('./models/UserModel');
const { Booking } = require('./models/BookingModel');
const { Room } = require('./models/RoomModel');

require('dotenv').config();
dotenv.config();

const User = [
     {
          
     }
]

const Room = [
     {
          roomType: "Standard"
     },
     {
          roomType: "Deluxe"
     }

]

const Pet = [{
     },
     {
          
     }
]

// // Connect to the database.
// var databaseURL = "";
// switch (process.env.NODE_ENV.toLowerCase()) {
//     case "test":
//         databaseURL = "mongodb://localhost:27017/ExpressBuildAnAPI-test";
//         break;
//     case "development":
//         databaseURL = "mongodb://localhost:27017/ExpressBuildAnAPI-dev";
//         break;
//     case "production":
//         databaseURL = process.env.DATABASE_URL;
//         break;
//     default:
//         console.error("Incorrect JS environment specified, database will not be connected.");
//         break;
// }

// databaseConnector(databaseURL).then(() => {
//      console.log("Database connected successfully!");
//  }).catch(error => {
//      console.log(`
//      Some error occurred connecting to the database! It was: 
//      ${error}
//      `);
//  }).then(async () => {
//      if (process.env.WIPE == "true"){
//          // Get the names of all collections in the DB.
//          const collections = await mongoose.connection.db.listCollections().toArray();
 
//          // Empty the data and collections from the DB so that they no longer exist.
//          collections.map((collection) => collection.name)
//          .forEach(async (collectionName) => {
//              mongoose.connection.db.dropCollection(collectionName);
//          });
//          console.log("Old DB data deleted.");
//      }
//  }).then(async () => {
//      // Add new data into the database.
//      await Role.insertMany(roles);
 
//      console.log("New DB data created.");
//  }).then(() => {
//      // Disconnect from the database.
//      mongoose.connection.close();
//      console.log("DB seed connection closed.")
//  });


databaseConnect().then(async () => {

     console.log("Creating seed data!");

     // let newUser = await User.create({
     //      firstName: "John",
     //      lastName: "Smith",
     //      email: "johnsmith@example.com",
     //      username: "johnsmith",
     //      password: "john12345",
     // });

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

          console.log(`New Data created.\n + JSON.stringify({users: userCreated})`);

}).then(async () => {
     await mongoose.connection.close();
     console.log("Database disconnected!");

})