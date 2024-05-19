const { Product } = require('../Models');

const ProductData = [
  {
    Product_Name: 'Plain T-Shirt',
    Price: 14.99,
    Stock: 14,
    Category_Id: 1,
  },
  {
    Product_Name: 'Running Sneakers',
    Price: 90.0,
    Stock: 25,
    Category_Id: 5,
  },
  {
    Product_Name: 'Branded Baseball Hat',
    Price: 22.99,
    Stock: 12,
    Category_Id: 4,
  },
  {
    Product_Name: 'Top 40 Music Compilation Vinyl Record',
    Price: 12.99,
    Stock: 50,
    Category_Id: 3,
  },
  {
    Product_Name: 'Cargo Shorts',
    Price: 29.99,
    Stock: 22,
    Category_Id: 2,
  },
];

const SeedProducts = () => Product.bulkCreate(ProductData);

module.exports = SeedProducts;