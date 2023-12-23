// This file handles the boot-up of the server
const dotenv = require('dotenv')
dotenv.config();

const { app, PORT} = require('./server');

app.listen(PORT, async () => {
     console.log('Pawtel server is running!');

});