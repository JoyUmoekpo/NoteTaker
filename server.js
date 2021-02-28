const express = require('express');
const path = require('path');
const fs = require('fs');
const route = require("./routes/");

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(route);

app.listen(PORT, function() {
    console.log("App listening on: http://localhost:" + PORT);
});
