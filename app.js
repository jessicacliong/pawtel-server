const express = require('express');
const bookingRouter = require('./src/routes/bookings_routes');

// make an instance of the server that we can customise and run
const app = express();

// Allow server flexibility to open on other ports if occupied
const PORT = process.env.PORT || 3030;


// GET localhost:3000/
// app.get(route path, callback_function)
app.get("/", (req, res) => {

     res.send('Welcome to Pawtel!');

});

app.use('/bookings', bookingRouter);

app.listen(PORT, () => {

     console.log(`Server is running on port: " + ${PORT}`);

});