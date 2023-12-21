// This file handles the boot-up of the server

const dotenv = require('dotenv')
dotenv.config();

const { databaseConnect } = require('./database');
const { app } = require('./server');

const PORT = process.env.PORT || 3030;

app.listen(PORT, async () => {
     await databaseConnect();
     console.log('Pawtel server is running!');

});