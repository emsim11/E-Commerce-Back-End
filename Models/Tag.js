const { Model, DataTypes } = require('sequelize');
const Sequelize = require('../Configuration/Connection');

class Tag extends Model {}

Tag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    Tag_Name: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize: Sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag'
  }
);

module.exports = Tag;