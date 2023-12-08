// import the server package
const express = require('express');

// make an instance of the server that we can customise and run
const app = express();

// GET localhost:3000/
// app.get(route path, callback_function)
app.get("/", (request, response) => {

});

app.listen(3000,() => {
     console.log("Server is running on port: " + 3000);
})