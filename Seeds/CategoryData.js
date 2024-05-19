const { Category } = require('../Models');

const CategoryData = [
  {
    Category_Name: 'Shirts',
  },
  {
    Category_Name: 'Shorts',
  },
  {
    Category_Name: 'Music',
  },
  {
    Category_Name: 'Hats',
  },
  {
    Category_Name: 'Shoes',
  },
];

const SeedCategories = () => Category.bulkCreate(CategoryData);

module.exports = SeedCategories;