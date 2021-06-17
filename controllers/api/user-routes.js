const router = require('express').Router();
const { User, Role, Comment, Band, Show, Genre } = require('../../models');

router.get('/', (req, res) => {
    User.findAll({})
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        res.status(500).json({ message: 'Cannot find users' })
    });
});


router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        // role_id: req.body.role_id
    })
    .then(dbUserData => {
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json(dbUserData);
        });
    })
    .catch(err => {
        
        res.status(500).json({message: 'unable to create user'});
    });
});


module.exports = router;