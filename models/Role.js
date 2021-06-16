const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Role extends Model {};

Role.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        role_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'role'
    }
);

module.exports = Role;