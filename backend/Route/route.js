const express = require('express');
const router = express.Router(); // Use 'router' instead of 'route' for consistency

const user = require('../Controller/UserController'); // Make sure this path is correct

// Define your routes
router.post('/signup', user.Signup);
router.post('/login', user.Login);

module.exports = router; // Export the router
