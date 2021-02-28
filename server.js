const express = require('express');
const path = require('path');
const fs = require('fs');

require("./routes/api");
require("./routes/html");

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, function() {
    console.log("App listening on: http://localhost:" + PORT);
});
