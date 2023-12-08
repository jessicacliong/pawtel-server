// import the server package
const express = require('express');

// make an instance of the server that we can customise and run
const app = express();

// Allow server flexibility to open on other ports if occupied
const PORT = process.env.PORT || 3030;


// GET localhost:3000/
// app.get(route path, callback_function)
app.get("/", (request, response) => {

     response.send('Hello World!');

});

app.listen(PORT, () => {

     console.log(`Server is running on port: " + ${PORT}`);

});