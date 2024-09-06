const express = require('express');
const cors = require('cors');
const db = require('./Config/db');
const routes = require('./Route/route'); // Make sure the path is correct
require('dotenv').config();

const app = express();

// Connect to the database
db();

// Middleware
app.use(cors());
app.use(express.json());

// Use routes
app.use('/api', routes);

// Export the app
module.exports = app;
