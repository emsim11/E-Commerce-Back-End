// Import Models
const Category = require('./Category');
const Product = require('./Product');
const ProductTag = require('./ProductTag')
const Tag = require('./Tag');

// 'Category_Id' - 'Product' Belongs to 'Category' and 'Category' Has Many 'Product'
Product.belongsTo(Category, {
  foreignKey: 'Category_Id',
  onDelete: 'CASCADE'
});

Category.hasMany(Product, {
  foreignKey: 'Category_Id'
});

// 'Tag_Id' & 'Product_Id' - 'Product' Belongs to Many 'Tag' and 'Tag' Belongs to Many 'Product'
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'Tag_Id'
})

Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'Product_Id'
});

module.exports = { Category, Product, ProductTag, Tag };