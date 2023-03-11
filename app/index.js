// Dependencies
const express = require('express');
const logger = require('morgan');
const cors = require('cors');

// Import API Routes
const imageRoute = require('../api/index.js');

// Init Express
const app = express();

// Log all requests using morgan
app.use(logger('dev'));

// Middleware
app.use(express.json({ extended: true }));
app.use(cors());

// Init a static path reference to hold uploaded images
app.use('../uploads', express.static('uploads'));

// Init API routes to Express
app.use('/api/v1/images', imageRoute);

// Export app so it can be passed to server
module.exports = app;
