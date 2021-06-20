const router = require('express').Router();
const sequelize = require('../config/connection');
const { Role, Show, User, Genre, Comment, Band } = require('../models');


router.get('/', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/show')
    }
    res.render('signup')
});

router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/show')
    }
    res.render('login')
});


module.exports = router;