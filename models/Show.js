const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Show extends Model {};

Show.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        img: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true
            }            
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false,            
        },
        youtube_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        show_location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        show_time: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        privacy: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        band_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'band',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'show'
    }
);

module.exports = Show;