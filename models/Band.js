const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Band extends Model {};

Band.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        bandname: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'band'
    }
);

module.exports = Band;