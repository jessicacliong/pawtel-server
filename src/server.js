const dotenv = require('dotenv');
dotenv.config();

// Import the Express package and configure some needed data.
const express = require('express');
const app = express();

// If no process.env.X is found, assign a default value instead.
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3030;


// Configure some basic Helmet settings on the server instance.
const helmet = require('helmet');
app.use(helmet());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
    },
  })
);

const cors = require('cors');
const corsOptions = {
     origin: '*',
     optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

// To Enable HTTP verb responses to support JSON body and form data.
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const mongoose = require('mongoose');
const {databaseConnector, getDatabaseURL} = require('./database');

// set connection URL
const databaseURL = getDatabaseURL(process.env.NODE_ENV);

databaseConnector(databaseURL).then(() => {
    console.log(`Database connected successfully! \n Port: ${PORT}`);
  })
  .catch((error) => {
    console.log(`
    ERROR occurred connecting to the database! It was:\n
    ${JSON.stringify(error)}
    `);
  });

// Return useful details from the database connection
app.get("/databaseHealth", (request, response) => {
     let databaseState = mongoose.connection.readyState;
     let databaseName = mongoose.connection.name;
     let databaseModels = mongoose.connection.modelNames();
     let databaseHost = mongoose.connection.host;
 
     response.json({
         readyState: databaseState,
         dbName: databaseName,
         dbModels: databaseModels,
         dbHost: databaseHost
     })
 });


 app.get("/databaseDump", async (request, response) => {
     // Set up an object to store our data.
     const dumpContainer = {};
 
     // Get the names of all collections in the DB.
     var collections = await mongoose.connection.db.listCollections().toArray();
     collections = collections.map((collection) => collection.name);
 
     // For each collection, get all their data and add it to the dumpContainer.
     for (const collectionName of collections) {
         let collectionData = await mongoose.connection.db.collection(collectionName).find({}).toArray();
         dumpContainer[collectionName] = collectionData;
     }
 
     // Confirm in the terminal that the server is returning the right data.
     console.log("Dumping all of this data to the client: \n" + JSON.stringify(dumpContainer, null, 4));
 
     // Return the big data object.
     response.json({
         data: dumpContainer
     });
 });


// Pawtel utilises the following routes:
const bookingRouter = require('./controllers/BookingsController');
app.use("/bookings", bookingRouter);

const userRouter = require('./controllers/UsersController');
app.use("/users", userRouter);

// Welcome Route
app.get("/", (request, response) => {
     response.status(418).json({
          message:'Welcome to Pawtel API!',
          attemptedPath: request.path
     });
});

// A 404 route should only trigger if no preceding routes or middleware was run. 
app.get('*', (request, response) => {
     response.status(404).json({
         message: "No route with that path found!",
         attemptedPath: request.path
     });
 });
 
 // Export everything needed to run the server.
 module.exports = {
     HOST,
     PORT,
     app
}