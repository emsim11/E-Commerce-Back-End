const { Model, DataTypes } = require('sequelize');
const Sequelize = require('../Configuration/Connection');

class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    Category_Name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize: Sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category'
  }
);

module.exports = Category;