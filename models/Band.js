const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


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
    underscored: true,
    modelName: 'band'
    }
);

module.exports = Band;