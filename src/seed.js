//import necessary modules and functions
const mongoose = require('mongoose');
const { databaseConnector, getDatabaseURL } = require('./database');

// import models
const { Pet } = require('./models/PetModel');
const { User } = require('./models/UserModel');
const { Booking } = require('./models/BookingModel');
const { Room } = require('./models/RoomModel');

// import model functions
const { hashString } = require('./functions/UserFunctions');

const dotenv = require('dotenv');
dotenv.config();

// Function to seed database
async function seedDatabase() {
    try {
    // Connect to the database
    const databaseURL = getDatabaseURL (process.env.NODE_ENV);
    await databaseConnector(databaseURL);
    console.log('Database connected successfully!');

    // Check if wipe is true and then drop collections
    if (process.env.WIPE == 'true') {
        // Get the names of all collections in the DB.
        const collections = await mongoose.connection.db
           .listCollections()
           .toArray();
 
        // Use Promise.all to wait for all dropCollection operations to complete and empty the data and collections from the DB so that they no longer exist.
        await Promise.all(
           collections.map(async (collection) => {
            await mongoose.connection.db.dropCollection(collection.name);
           })
        );
    }
    const users = [
        {
            firstName: 'John',
            lastName: 'Smith',
            email: 'johnsmith@email.com',
            username: 'johnsmith',
            password: 'john12345',
        },
        {
            firstName: 'Alice',
            lastName: 'Brenner',
            email: 'alicebrenner@email.com',
            username: 'alicebrenner',
            password: 'alice12345',
        },
        {
            firstName: 'Bob',
            lastName: 'Cooper',
            email: 'bobcooper@email.com',
            username: 'bobcooper',
            password: 'bob12345',
        }
    ];

    const roomData = [
         {
            roomType: "Standard",
            pricePerNight: 100,
         },
         {
            roomType: "Deluxe",
            pricePerNight: 200,
         }
    ]

    const petData = [
        {
            name: "Puma",
            animalType: "dog",
            breed: "Chow-chow",
            colour: "brown",
            gender: "male",
            age: 2,
            favouriteToys: "ball, squeaky toy, favourite blanket",
            dietaryRequirements: "None",
            allergies: "None",
            userId: null,
        }, 
        {
            name: "Kiki",
            animalType: "dog",
            breed: "Pomeranian",
            colour: "white",
            gender: "female",
            age: 1,
            favouriteToys: "teddy bear, rubber ducky",
            dietaryRequirements: "vegetarian",
            allergies: "red meat",
            userId: null,
        }
    ];

    const bookingData = [
        {    
            roomType: "Standard",
            startDate: new Date('2024-01-01T09:00:00Z'),
            endDate: new Date('2024-01-10T09:00:00Z'),
            petId: null,
        },
        {
            roomType: "Deluxe",
            startDate: new Date('2024-02-01T09:00:00Z'),
            endDate: new Date('2024-02-10T09:00:00Z'),
            petId: null,
        }
    ];


    // Hash passwords and create users
    // Iterate through the users array
    for (const user of users) {
        
        // Hash the password of the user
        user.password = await hashString(user.password);
    }
    // Save the users to the database.
    const usersCreated = await User.insertMany(users);

    petData[0].userId = usersCreated[0]._id;
    petData[1].userId = usersCreated[1]._id;

    // Save the pets to the database
    const petsCreated = await Pet.insertMany(petData);

    // Update the booking data with petId staying in the room
    bookingData[0].petId = petsCreated[0]._id;
    bookingData[1].petId = petsCreated[1]._id;

    // Save the rooms to the database.
    const bookingsCreated = await Booking.insertMany(bookingData);

    const roomsCreated = await Room.insertMany(roomData);

    console.log(
        'New DB data created\n' + 
            JSON.stringify(
                {
                    users: usersCreated,
                    pets: petsCreated,
                    bookings: bookingsCreated,
                    rooms: roomsCreated
                }, 
                null, 
                4
            )
        );
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        // Disconnect from the database.
        mongoose.connection.close();
        console.log('DB seed connection closed.');
    }
}


seedDatabase();