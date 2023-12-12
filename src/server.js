const express = require('express');
const bookingRouter = require('./routes/BookingsRoutes');

// make an instance of the server that we can customise and run
const app = express();

// Allow server flexibility to open on other ports if occupied
const PORT = process.env.PORT || 3030;

{/* To Enable HTTP verb responses to support JSON body and form data. */}
app.use(express.json());
app.use(express.urlencoded({extended: true}));


{/* GET localhost:3000/ */} 
// app.get(route path, callback_function)
app.get("/", (req, res) => {

     res.json('Welcome to Pawtel!');

});

const bookingRouter = require('./controllers/BookingsController')

app.use("/bookings", bookingRouter);


module.exports = {
     app, 
     PORT
}