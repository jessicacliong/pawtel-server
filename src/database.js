const mongoose = require('mongoose');

async function databaseConnector(databaseURL) {
     await mongoose.connect(databaseURL);
 }
 
 async function databaseDisconnector() {
     await mongoose.connection.close();
 } 

function getDatabaseURL(environment) {
     switch (environment.toLowerCase()) {
       case 'development':
         return process.env.DEV_DB_URL;
       case 'production':
         return process.env.PROD_DB_URL;
       default:
         console.error(
           'Incorrect JS environment specified'
         );
         return process.env.DEFAULT_DB_URL || '';
     }
   }

// /** 
//  * Connect to a database
//  */

async function databaseConnect(){
     try {
          console.log("Connecting to:\n + process.env.DB_URI");
          await mongoose.connect(process.env.DB_URI);
          console.log("Database connected");
     } catch (error) {
          console.warn(`databaseConnect failed to connect to DB:\n ${JSON.stringify(error)}`);
     }
}

module.exports = {
    databaseConnect,
    databaseConnector,
    databaseDisconnector,
    getDatabaseURL
}