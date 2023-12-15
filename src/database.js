const mongoose = require('mongoose');

/** 
 * Connect to a database
 */

async function databaseConnect(){
     try {
          await mongoose.connect('')
          console.log("Database connected");
     } catch (error) {
          console.warn(`databaseConnect failed to connect to DB:\n${JSON.stringify(error)}`);
     }
}

module.exports = {
     databaseConnect
}