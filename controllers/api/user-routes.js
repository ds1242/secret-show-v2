const router = require('express').Router();
const { User, Role, Comment, Band, Show, Genre } = require('../../models');

router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        res.status(500).json({ message: 'Cannot find users' })
    });
});


router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: 'Cannont find user with this id' });
            return;
        }
        res.json(dbUserData)
    })
    .catch(err => {
        res.status(500).json({ message: 'something went wrong getting this user' });
    });
});


router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role_id: req.body.role_id
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

// update a User router
router.put('/:id', (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbUserUpdate => {
        if(!dbUserUpdate[0]) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserUpdate)
    })
    .catch(err => {
        res.status(500).json({ message: 'Unable to update user' });
    });
});

router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserDelete => {
        if(!dbUserDelete) {
            res.status(404).json({ message: 'No User with that id'})
            return;
        }
        res.json(dbUserDelete)
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

module.exports = router;