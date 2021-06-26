const router = require('express').Router();
const sequelize = require('../config/connection');
const { Show, User, Comment, Band } = require('../models');
require('dotenv').config();

// The below, as uncommented, when logged in, can no longer to to main page, only /show. Commented out, you can visit homepage or show page just fine
router.get('/', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/show')
    }
    res.render('signup')
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/show')
    }
    res.render('login')
});

router.get('/show', (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/')
    }
    Show.findAll({
        include: {
            model: User,
            attributes: ['id']
        },
        order: [[
            'show_date', 'ASC'
        ]],
    })

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
        });
});

router.get('/show/:id', (req, res) => {
    const apiKey = process.env.Map_API
    if (!req.session.loggedIn) {
        res.redirect('/')
    }
    Show.findOne({
        where: {
            id: req.params.id
        },
        include: {
            model: User,
            attributes: ['id']
        }
    })
        .then(dbShowSingleData => {
            if (!dbShowSingleData) {
                res.status(404).json({ message: 'No show found with this id' });
                return;
            }
            const show = dbShowSingleData.get({ plain: true });

            res.render('single-show', {
                show,
                apiKey,
                loggedIn: req.session.loggedIn,

            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
router.get('/create-show', (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/')
    }
    res.render('create-show');
});

router.get('/edit-show/:id', (req, res) => {
    Show.findOne({
        where: {
            id: req.params.id
        },
        include: {
            model: User,
            attributes: ['id']
        }
    })

        .then(dbShowSingleData => {
            if (!dbShowSingleData) {
                res.status(404).json({ message: 'No show found with this id' });
                return;
            }
            const show = dbShowSingleData.get({ plain: true });

            res.render('edit-show', {
                show,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


module.exports = router;