const router = require('express').Router();
const { User, Comment, Band, Show, Genre } = require('../../models');
const withAuth = require('../../utils/auth');


// Find all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            res.status(500).json({ message: 'Cannot find users' })
        });
});

// Find one user by id
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'Cannot find user with this id' });
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => {
            res.status(500).json({ message: 'something went wrong getting this user' });
        });
});

// This route creates a new user at signup
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
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

            res.status(500).json({ message: 'unable to create user' });
        });
});


// This route is for logging in an existing user
router.post('/login', (req, res) => {
    // expects {email: 'lernantino@gmail.com', password: 'password1234'}
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            console.log('You are not logged in');
            res.status(400).json({ message: 'No user with that email address!' });
            return;
        }

        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            console.log('You are now logged in');
            res.json({ user: dbUserData, message: 'You are now logged in!' });
        });
    });
});

// This route is for loggin out
router.post('/logout', withAuth, (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
})


// update a User router
router.put('/:id', (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
        .then(dbUserUpdate => {
            if (!dbUserUpdate[0]) {
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
            if (!dbUserDelete) {
                res.status(404).json({ message: 'No User with that id' })
                return;
            }
            res.json(dbUserDelete)
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;