// Import Express Module and Initialize Router
const Router = require('express').Router();

// Import Dependencies
const APIRoutes = require('./API');

// Establish Route Endpoint
Router.use('/API', APIRoutes);

// Export Router Module
module.exports = Router;