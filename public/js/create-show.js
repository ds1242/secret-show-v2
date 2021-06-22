const router = require('express').Router();
const sequelize = require('../config/connection');
const { Role, Show, User, Genre, Comment, Band } = require('../models');
