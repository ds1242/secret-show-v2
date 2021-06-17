const router = require('express').Router();
const { User, Role, Comment, Band, Show, Genre } = require('../../models');

router.get('/', (req, res) => {
    Role.findAll({})
    .then(dbRoleFindAll => res.json(dbRoleFindAll))
    .catch(err => {
        res.status(500).json({ message: 'Cannot find roles' });
    });
});
router.post('/', (req, res) => {
    Role.create({
        role_name: req.body.role_name
    })
    .then(dbRoleCreate => {
        res.json(dbRoleCreate);
    })
    .catch(err => {
        res.status(500).json({ message: 'Unable to create a Role' });
    });
});

module.exports = router;
