const router = require('express').Router();
const sequelize = require('../config/connection');
const { Band, Comment, Genre, Show, User } = require('../models');

// Ger all the posts
router.get('/', (req, res) => {
    Show.findAll()

    .then(dbShowData => {
        const shows = dbShowData.map(show => show.get({ plain: true }));

        res.render('show', {
            shows,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})


module.exports = router;