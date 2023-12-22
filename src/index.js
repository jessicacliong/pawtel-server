// This file handles the boot-up of the server
const dotenv = require('dotenv')
dotenv.config();

const { databaseConnect } = require('./database');
const { app, PORT, HOST } = require('./server');

app.listen(PORT, HOST, async () => {
     await databaseConnect();
     console.log('Pawtel server is running!');

});