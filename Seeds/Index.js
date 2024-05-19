// Import Seed Files
const SeedCategories = require('./CategoryData');
const SeedProducts = require('./ProductData');
const SeedTags = require('./TagData');
const SeedProductTags = require('./ProductTagData');

// Import Configuration File
const Sequelize = require('../Configuration/Connection');

// Function To Seed Data to 'ecommerce' Database
const SeedAll = async () => {
  await Sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  
  await SeedCategories();
  console.log('\n----- CATEGORIES SEEDED -----\n');

  await SeedProducts();
  console.log('\n----- PRODUCTS SEEDED -----\n');

  await SeedTags();
  console.log('\n----- TAGS SEEDED -----\n');

  await SeedProductTags();
  console.log('\n----- PRODUCT TAGS SEEDED -----\n');

  process.exit(0);
};

SeedAll();