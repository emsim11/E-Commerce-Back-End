const { Model, DataTypes } = require('sequelize');
const Sequelize = require('../Configuration/Connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    Product_Id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'product',
        key: 'id'
      }
    },
    Tag_Id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tag',
        key: 'id'
      }
    }
  },
  {
    sequelize: Sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag'
  }
);

module.exports = ProductTag;