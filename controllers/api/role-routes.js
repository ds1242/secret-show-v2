const router = require('express').Router();
const { User, Role, Comment, Band, Show, Genre } = require('../../models');
//"/api/role/" - METHOD GET 
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

router.get('/:id', (req, res) => {
    Role.findOne({
        where: {
            id: req.params.id
        },
        // include: [
        //     {
        //         model: User,
        //         attributes: ['id', 'username','password','email','role_id']
        //     }
        // ]
    })
    .then(dbRoleSingleData => {
        if(!dbRoleSingleData) {
            res.status(404).json({ message: 'Cannont find a role with this id' });
            return;
        }
        res.json(dbRoleSingleData)
    })
    .catch(err => {
        res.status(500).json({ message: 'something went wrong getting this role' });
    });
});

module.exports = router;
