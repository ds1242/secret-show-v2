const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Show extends Model { };

Show.init(
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
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        img: {
            type: DataTypes.STRING(500),
            allowNull: false,
            validate: {
                isUrl: true
            }
        },
        youtube_id: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
        show_location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        show_time: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        privacy: {
            type: DataTypes.STRING,
            allowNull: false
        },
        view_count: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "0"
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
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