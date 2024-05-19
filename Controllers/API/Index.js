// Import Express Module and Initialize Router
const Router = require('express').Router();

// Import API Dependencies
const CategoryRoutes = require('./CategoryRoutes');
const ProductRoutes = require('./ProductRoutes');
const TagRoutes = require('./TagRoutes');

// Establish API Route Endpoints
Router.use('/Categories', CategoryRoutes);
Router.use('/Products', ProductRoutes);
Router.use('/Tags', TagRoutes);

// Export Router Module
module.exports = Router;