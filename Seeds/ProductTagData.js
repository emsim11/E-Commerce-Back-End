const { ProductTag } = require('../Models');

const ProductTagData = [
  {
    Product_Id: 1,
    Tag_Id: 6,
  },
  {
    Product_Id: 1,
    Tag_Id: 7,
  },
  {
    Product_Id: 1,
    Tag_Id: 8,
  },
  {
    Product_Id: 2,
    Tag_Id: 6,
  },
  {
    Product_Id: 3,
    Tag_Id: 1,
  },
  {
    Product_Id: 3,
    Tag_Id: 3,
  },
  {
    Product_Id: 3,
    Tag_Id: 4,
  },
  {
    Product_Id: 3,
    Tag_Id: 5,
  },
  {
    Product_Id: 4,
    Tag_Id: 1,
  },
  {
    Product_Id: 4,
    Tag_Id: 2,
  },
  {
    Product_Id: 4,
    Tag_Id: 8,
  },
  {
    Product_Id: 5,
    Tag_Id: 3,
  },
];

const SeedProductTags = () => ProductTag.bulkCreate(ProductTagData);

module.exports = SeedProductTags;