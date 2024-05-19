// Import Modules
const Express = require('express');

// Import Dependencies
const Sequelize = require('./Configuration/Connection');
const Routes = require('./Controllers');

// Initialize Application and PORT
const App = Express();
const PORT = process.env.PORT || 3001;

// Connect Express Routes
App.use(Express.json());
App.use(Express.urlencoded({ extended: true }));
App.use(Routes);

// Sync Database and Start Listening on the Server
Sequelize.sync({ force: false }).then(() => {
  App.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
  });
});